// 0. Make sure the user has a connected wallet

import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";
import { useAuthenticateMutation } from "@/graphql/generated";
import { useMutation } from "@tanstack/react-query";
import { setAccessToken } from "./helpers";



// 1. write the actual asyncn function
export default function useLogin(){
    const address = useAddress()
    const sdk = useSDK()
    const { mutateAsync: sendSignedMessage } = useAuthenticateMutation()

    async function login(){
        if(!address) return
        // 1. generate challenge which comes from the lens api
        const { challenge } = await generateChallenge(address)

        // 2. sign the chellenge with the user's wallet
        const signature = await sdk?.wallet.sign(challenge.text)

        // 3. send the signed challenge to the lens api
        const { authenticate } = await sendSignedMessage(
            {
                request: {
                    address,
                    signature,
                },
            }
        )
        console.log("Authenticated:", authenticate);
        
        // 4. receive a access token from the le,s api if we succed
        // 5. store the  access token inside local storage so we can use it 
        const {accessToken, refreshToken} = authenticate

        setAccessToken(accessToken, refreshToken)
    }
    

    // 2. return the useMutation hook wrapping the async function
    return useMutation(login)
}
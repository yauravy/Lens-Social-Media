import useLensUser from '@/lib/auth/useLensUser'
import useLogin from '@/lib/auth/useLogin'
import { ChainId, ConnectWallet, useAddress, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react'
import React from 'react'

type Props = {}

export default function SignInButton({}: Props) {
    const address = useAddress() // detect the connected address
    const  isOnWrongNetwork = useNetworkMismatch() // detect if the user is on the wrong network
    const switchNetwork = useSwitchChain() // function to switch the network
    const { isSignedInQuery, profileQuery } = useLensUser()
    const { mutate: requestLogin } = useLogin()
    // 1. user needs to connect their wallet
    if(!address){
        return(
            <ConnectWallet/>
        )
    }

    // 2. user needs to switch the network to polygon
    if(isOnWrongNetwork){
        return (
            <button onClick={() => switchNetwork?.(ChainId.Mumbai)}>
                Switch Network
            </button>
        )
    }

    // loading their signed  in state
    if(isSignedInQuery.isLoading){
        return <div>Loading...</div>
    }

    // if the user is not signed in, we need to request a login
    if(!isSignedInQuery.data){
        return <button onClick={() => requestLogin()}>Sing in with Lens</button>
    }

    // if it's done loading and there is no default profile
    if(!profileQuery.data?.defaultProfile){
        return <div>No Lens Profile</div>
    }

    // if it's done loading and there is  default profile

    if(profileQuery.data.defaultProfile){
        return <div>Helloo {profileQuery.data.defaultProfile.handle}</div>
    }
    
  return (
    <div>
        Something went wrong
    </div>
  )
}
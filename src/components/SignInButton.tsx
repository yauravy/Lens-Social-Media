import { ChainId, ConnectWallet, useAddress, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react'
import React from 'react'

type Props = {}

export default function SignInButton({}: Props) {
    const address = useAddress() // detect the connected address
    const  isOnWrongNetwork = useNetworkMismatch() // detect if the user is on the wrong network
    const [, switchNetwork] = useSwitchChain() // function to switch the network
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

    // 3.  sign in with lens

    // 4. show to user their profile on lens
  return (
    <div>SignInButton</div>
  )
}
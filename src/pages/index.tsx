import { useExplorePublicationsQuery, PublicationSortCriteria } from "@/graphql/generated"
import useLogin from "@/lib/auth/useLogin"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import loadConfig from "next/dist/server/config"


export default function Home() {
  const address = useAddress()
  const { mutate: requestLogin } = useLogin()

  if(!address){
    return(<ConnectWallet/>)
  }

  return (
    <button
      onClick={() => requestLogin()}>Login</button>
  )
}

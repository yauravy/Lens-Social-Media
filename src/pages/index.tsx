import SignInButton from "@/components/SignInButton"
import { useExplorePublicationsQuery, PublicationSortCriteria } from "@/graphql/generated"
import useLogin from "@/lib/auth/useLogin"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import loadConfig from "next/dist/server/config"


export default function Home() {
  return <SignInButton />
}

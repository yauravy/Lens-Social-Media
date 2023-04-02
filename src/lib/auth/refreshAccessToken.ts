import { fetcher } from "@/graphql/auth-fetcher";
import { RefreshDocument, RefreshMutation, RefreshMutationVariables } from "@/graphql/generated";
import { readAccessToken, setAccessToken } from "./helpers";

export default async function refreshAccessToken(){

    // 1. get our current refresh token from local storage
    const currentRefreshToken = readAccessToken()?.refreshToken

    if (!currentRefreshToken) return null
    
    // 2. send it to lens to ask for a new access token
    const result = await fetcher<RefreshMutation, RefreshMutationVariables>(
        RefreshDocument, 
        {
            request: {
                refreshToken: currentRefreshToken,
            },
        }
    )()

    // 3. set the new access token in local storage    
    const { accessToken, refreshToken: newRefreshToken } = result.refresh
    setAccessToken(accessToken, newRefreshToken)

    return accessToken as string
}

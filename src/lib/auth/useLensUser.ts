import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery, DefaultProfileQueryVariables } from "../../graphql/generated";

export default function useLensUser() {
  // 1. Make a react query for the local storage Key
  const address = useAddress();

  const localStorageQuery = useQuery(
    ["lens-user", address],
    // Writing the actual function to check the local storage
    () => readAccessToken()
  );


  // If there is a connected wallet address
  // Then we can ask for the default profile from Lens
  const profileQuery = useDefaultProfileQuery(
    {
      endpoint: "https://api-mumbai.lens.dev/", // Replace with your GraphQL endpoint
      fetchParams: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
    {
      request: {
        ethereumAddress: address || "", // Use an empty string if address is undefined
      },
    },
    { enabled: !!address }
  );

  console.log(profileQuery.data?.defaultProfile);

  return {
    // Contains information about both the local storage
    // AND the information about the lens profile
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  };
}
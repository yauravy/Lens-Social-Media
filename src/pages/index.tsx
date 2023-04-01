import { useExplorePublicationsQuery, PublicationSortCriteria } from "@/graphql/generated"
import loadConfig from "next/dist/server/config"


export default function Home() {

  const { data, isLoading, error } = useExplorePublicationsQuery(
    {
      endpoint: "https://api.lens.dev",
      fetchParams: {
        // Return  application/json
        headers: {
          "Content-Type": "application/json",
        }
      },
    },
    {
      request: {
        sortCriteria: PublicationSortCriteria.TopCollected,
      },
    }
  )

  console.log({
    data,
    isLoading,
    error,
  });
  

  return (
    <>
      <h1>helloss</h1>
    </>
  )
}

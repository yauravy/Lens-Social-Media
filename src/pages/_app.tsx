import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from "@thirdweb-dev/react"

export default function App({ Component, pageProps }: AppProps) {
  // create a client
  const queryClient = new QueryClient()

  return(
    <ThirdwebProvider activeChain="mumbai">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThirdwebProvider>
  )
}

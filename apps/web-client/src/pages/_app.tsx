import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { NextNProgress } from '@nham-avey/react-component'

import { PRIMARY } from '../constants/colors-constants'
import RestaurantPageStateContextProvider from '../context/restaurant-page-state-context'
import useApollo from '../hooks/use-apollo'
import '../styles.css'

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <Head>
        <title>Welcome to nham-avey-fe!</title>
      </Head>
      <main className="app">
        <NextNProgress
          color={PRIMARY}
          showOnShallow
          options={{ showSpinner: false }}
        />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ApolloProvider client={apolloClient}>
            <RestaurantPageStateContextProvider>
              <Component {...pageProps} />
            </RestaurantPageStateContextProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </main>
    </>
  )
}

export default CustomApp

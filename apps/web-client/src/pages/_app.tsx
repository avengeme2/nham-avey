import { useState } from 'react'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { NextNProgress } from '@nham-avey/react-component'

import { PRIMARY } from '../constants/colors-constants'
import RestaurantPageStateContextProvider from '../context/restaurant-page-state-context'

import '../styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchIntervalInBackground: false,
          },
        },
      }),
  )
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
          <Hydrate state={pageProps.dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} />

            <RestaurantPageStateContextProvider>
              <Component {...pageProps} />
            </RestaurantPageStateContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </main>
    </>
  )
}

export default CustomApp

import { useEffect } from 'react'

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { useRestaurantsQuery } from '../../__generated__/grapql.react-query'

/**
 * @todo Implement this component.
 */
const SearchPage = () => {
  const { query, isReady } = useRouter()
  const { term } = query
  const router = useRouter()
  const { data, isLoading } = useRestaurantsQuery({}, { enabled: false })

  useEffect(() => {
    if (!isReady || isLoading) return

    if (!term) {
      router.replace('/')
      return
    }
    // getRestaurants({
    //   variables: pageState,
    // })
  }, [router, term, isReady, isLoading])

  if (isLoading) return <p>Loading...</p>

  return (
    <h1>
      <NextSeo title="Search | Nham Avey" />
      <pre>{JSON.stringify(data || {}, null, 2)}</pre>
    </h1>
  )
}

export default SearchPage

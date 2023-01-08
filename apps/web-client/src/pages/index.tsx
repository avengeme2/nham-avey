import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

import {
  CategoriesDocument,
  CategoriesQuery,
  CategoriesQueryVariables,
  RestaurantsDocument,
  RestaurantsQuery,
  RestaurantsQueryVariables,
} from '../__generated__/grapql.react-query'
import HomePage, { CATEGORIES_VARIABLES } from '../components/pages/homepage'
import { DEFAULT_PAGE_STATE } from '../constants/common-constants'
import { fetchData } from '../utils/graphql-fetcher'

export const getServerSideProps: GetServerSideProps = async _ => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    ['Categories', CATEGORIES_VARIABLES],
    fetchData<CategoriesQuery, CategoriesQueryVariables>(
      CategoriesDocument,
      CATEGORIES_VARIABLES,
    ),
  )

  await queryClient.prefetchQuery(
    ['Restaurants', DEFAULT_PAGE_STATE],
    fetchData<RestaurantsQuery, RestaurantsQueryVariables>(
      RestaurantsDocument,
      DEFAULT_PAGE_STATE,
    ),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default HomePage

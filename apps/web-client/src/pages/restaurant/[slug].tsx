import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'

import {
  AllRestaurantsSlugDocument,
  AllRestaurantsSlugQuery,
  AllRestaurantsSlugQueryVariables,
  RestaurantBySlugDocument,
  RestaurantBySlugQuery,
  RestaurantBySlugQueryVariables,
} from '../../__generated__/grapql.react-query'
import { RestaurantPage } from '../../components/pages/restaurant-page/restaurant-page'
import { fetchData } from '../../utils/graphql-fetcher'

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    ['RestaurantBySlug', { slug: params?.slug as string }],
    fetchData<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>(
      RestaurantBySlugDocument,
      { slug: params?.slug as string },
    ),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 2,
  }
}

export const getStaticPaths = async () => {
  const queryClient = new QueryClient()

  const { allRestaurantsSlug } =
    await queryClient.fetchQuery<AllRestaurantsSlugQuery>(
      ['AllRestaurantsSlug'],
      fetchData<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>(
        AllRestaurantsSlugDocument,
      ),
    )

  const paths =
    allRestaurantsSlug?.slugs?.map(slug => ({
      params: { slug: slug },
    })) || []

  return { paths, fallback: 'blocking' }
}

export default RestaurantPage

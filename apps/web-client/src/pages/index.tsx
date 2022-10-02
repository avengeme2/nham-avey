import { GetStaticProps } from 'next'

import {
  CategoriesDocument,
  RestaurantsDocument,
  RestaurantsQuery,
  RestaurantsQueryVariables,
} from '@nham-avey/common'

import HomePage, { CATEGORIES_VARIABLES } from '../components/pages/homepage'
import { DEFAULT_PAGE_STATE } from '../constants/common-constants'
import { addApolloState, initializeApollo } from '../graphql/apollo-config'

export const getStaticProps: GetStaticProps = async _ => {
  const apolloClient = initializeApollo()

  await apolloClient.query<RestaurantsQuery, RestaurantsQueryVariables>({
    query: RestaurantsDocument,
    variables: DEFAULT_PAGE_STATE,
    fetchPolicy: 'no-cache',
  })

  await apolloClient.query({
    query: CategoriesDocument,
    variables: CATEGORIES_VARIABLES,
    fetchPolicy: 'no-cache',
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default HomePage

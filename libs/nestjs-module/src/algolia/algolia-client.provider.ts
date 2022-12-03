import { Provider } from '@nestjs/common'
import algoliasearch, { SearchClient } from 'algoliasearch'
import { AlgoliaModuleOptions } from './algolia-module-options'
import { ALGOLIA_CLIENT, ALGOLIA_MODULE_OPTIONS } from './algolia.constants'

export const createAlgoliaClient = (): Provider => ({
  provide: ALGOLIA_CLIENT,
  useFactory: (options: AlgoliaModuleOptions): SearchClient =>
    algoliasearch(
      options.applicationId,
      options.apiKey,
      options.searchClientOption,
    ),
  inject: [ALGOLIA_MODULE_OPTIONS],
})

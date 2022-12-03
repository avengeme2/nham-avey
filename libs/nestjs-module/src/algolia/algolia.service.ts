import {
  AddApiKeyOptions,
  AddApiKeyResponse,
  ApiKeyACLType,
  CopyIndexOptions,
  DeleteApiKeyResponse,
  DeleteResponse,
  GetApiKeyResponse,
  GetLogsResponse,
  IndexOperationResponse,
  ListApiKeysResponse,
  ListIndicesResponse,
  MultipleBatchRequest,
  MultipleBatchResponse,
  MultipleQueriesOptions,
  MultipleQueriesQuery,
  MultipleQueriesResponse,
  SearchForFacetValuesQueryParams,
  SearchForFacetValuesResponse,
  SearchOptions,
  SecuredApiKeyRestrictions,
  UpdateApiKeyOptions,
  UpdateApiKeyResponse,
} from '@algolia/client-search'
import { Injectable, Inject } from '@nestjs/common'
import { SearchClient, SearchIndex } from 'algoliasearch'
import { ALGOLIA_CLIENT } from './algolia.constants'
import { RequestOptions } from '@algolia/transporter'
import { WaitablePromise } from '@algolia/client-common'

@Injectable()
export class AlgoliaService {
  constructor(
    @Inject(ALGOLIA_CLIENT) private readonly algoliaClient: SearchClient,
  ) {}

  /**
   * Initialization of the index
   * https://github.com/algolia/algoliasearch-client-js#init-index---initindex
   */
  initIndex(indexName: string): SearchIndex {
    return this.algoliaClient.initIndex(indexName)
  }

  /**
   * Query on multiple index
   * https://github.com/algolia/algoliasearch-client-js#multiple-queries---multiplequeries
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search<TObject>(
    queries: MultipleQueriesQuery[],
    requestOptions?: RequestOptions & MultipleQueriesOptions,
  ): Promise<MultipleQueriesResponse<TObject>> {
    return this.algoliaClient.search<TObject>(queries, requestOptions)
  }

  /**
   * Query for facet values of a specific facet
   */
  searchForFacetValues(
    queries: ReadonlyArray<{
      readonly indexName: string
      readonly params: SearchForFacetValuesQueryParams & SearchOptions
    }>,
    requestOptions?: RequestOptions,
  ): Promise<readonly SearchForFacetValuesResponse[]> {
    return this.algoliaClient.searchForFacetValues(queries, requestOptions)
  }

  /**
   * clear browser cache
   * https://github.com/algolia/algoliasearch-client-js#cache
   */
  clearCache(): void {
    this.algoliaClient.clearCache()
  }

  /**
   * kill alive connections
   * https://github.com/algolia/algoliasearch-client-js#keep-alive
   */
  destroy(): void {
    this.algoliaClient.destroy()
  }

  /**
   * List all your indices along with their associated information (number of entries, disk size, etc.)
   * https://github.com/algolia/algoliasearch-client-js#list-indices---listindexes
   */
  listIndexes(requestOptions?: RequestOptions): Promise<ListIndicesResponse> {
    return this.algoliaClient.listIndices(requestOptions)
  }

  /**
   * Delete a specific index
   * https://github.com/algolia/algoliasearch-client-js#delete-index---deleteindex
   */
  deleteIndex(name: string): WaitablePromise<DeleteResponse> {
    return this.algoliaClient.initIndex(name).delete()
  }

  /**
   * Copy settings of an index from a specific index to a new one
   * https://github.com/algolia/algoliasearch-client-js#copy-index---copyindex
   */
  copyIndex(
    from: string,
    to: string,
    requestOptions?: CopyIndexOptions & RequestOptions,
  ): WaitablePromise<IndexOperationResponse> {
    return this.algoliaClient.copyIndex(from, to, requestOptions)
  }

  /**
   * Move index to a new one (and will overwrite the original one)
   * https://github.com/algolia/algoliasearch-client-js#move-index---moveindex
   */
  moveIndex(
    from: string,
    to: string,
    requestOptions?: RequestOptions,
  ): WaitablePromise<IndexOperationResponse> {
    return this.algoliaClient.moveIndex(from, to, requestOptions)
  }
  /**
   * Generate a public API key
   * https://github.com/algolia/algoliasearch-client-js#generate-key---generatesecuredapikey
   */
  generateSecuredApiKey(
    parentApiKey: string,
    restrictions: SecuredApiKeyRestrictions,
  ): string {
    return this.algoliaClient.generateSecuredApiKey(parentApiKey, restrictions)
  }

  /**
   * Perform multiple operations with one API call to reduce latency
   * https://github.com/algolia/algoliasearch-client-js#custom-batch---batch
   */
  batch(
    requests: readonly MultipleBatchRequest[],
    requestOptions?: RequestOptions,
  ): WaitablePromise<MultipleBatchResponse> {
    return this.algoliaClient.multipleBatch(requests, requestOptions)
  }

  /**
   * Lists global API Keys
   * https://github.com/algolia/algoliasearch-client-js#backup--export-an-index---browse
   */
  listApiKeys(requestOptions?: RequestOptions): Promise<ListApiKeysResponse> {
    return this.algoliaClient.listApiKeys(requestOptions)
  }

  /**
   * Add global API Keys
   * https://github.com/algolia/algoliasearch-client-js#add-user-key---addapikey
   */
  addApiKey(
    acl: readonly ApiKeyACLType[],
    requestOptions?: AddApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>,
  ): WaitablePromise<AddApiKeyResponse> {
    return this.algoliaClient.addApiKey(acl, requestOptions)
  }

  /**
   * Update global API key
   * https://github.com/algolia/algoliasearch-client-js#update-user-key---updateapikey
   */
  updateApiKey(
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>,
  ): WaitablePromise<UpdateApiKeyResponse> {
    return this.algoliaClient.updateApiKey(apiKey, requestOptions)
  }

  /**
   * Gets the rights of a global key
   * https://github.com/algolia/algoliasearch-client-js#update-user-key---updateapikey
   */
  getApiKey(
    apiKey: string,
    requestOptions?: RequestOptions,
  ): Promise<GetApiKeyResponse> {
    return this.algoliaClient.getApiKey(apiKey, requestOptions)
  }

  /**
   * Deletes a global key
   * https://github.com/algolia/algoliasearch-client-js#delete-user-key---deleteapikey
   */
  deleteApiKey(
    apiKey: string,
    requestOptions?: RequestOptions,
  ): WaitablePromise<DeleteApiKeyResponse> {
    return this.algoliaClient.deleteApiKey(apiKey, requestOptions)
  }

  /**
   * Get 1000 last events
   * https://github.com/algolia/algoliasearch-client-js#get-logs---getlogs
   */
  getLogs(requestOptions?: RequestOptions): Promise<GetLogsResponse> {
    return this.algoliaClient.getLogs(requestOptions)
  }
}

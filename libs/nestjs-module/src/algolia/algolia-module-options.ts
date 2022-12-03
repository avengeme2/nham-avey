import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import { AlgoliaSearchOptions } from 'algoliasearch/dist/algoliasearch'

export interface AlgoliaModuleOptions {
  applicationId: string
  apiKey: string
  searchClientOption?: AlgoliaSearchOptions
}

export interface AlgoliaOptionsFactory {
  createAlgoliaOptions(): Promise<AlgoliaModuleOptions> | AlgoliaModuleOptions
}

export interface AlgoliaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AlgoliaOptionsFactory>
  useClass?: Type<AlgoliaOptionsFactory>
  useFactory?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<AlgoliaModuleOptions> | AlgoliaModuleOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[]
}

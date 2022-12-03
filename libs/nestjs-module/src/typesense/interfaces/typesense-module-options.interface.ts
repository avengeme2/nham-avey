import { Client } from 'typesense'
import { ModuleMetadata, Type } from '@nestjs/common'

export type TypesenseModuleOptions = Client['configuration']

export interface TypesenseOptionsFactory {
  createTypesenseOptions():
    | Promise<TypesenseModuleOptions>
    | TypesenseModuleOptions
}

export interface TypesenseModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TypesenseOptionsFactory>
  useClass?: Type<TypesenseOptionsFactory>
  useFactory?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<TypesenseModuleOptions> | TypesenseModuleOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[]
}

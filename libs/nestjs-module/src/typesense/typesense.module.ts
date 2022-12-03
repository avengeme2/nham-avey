import { DynamicModule, Module, Provider } from '@nestjs/common'
import { TYPESENSE_MODULE_OPTIONS } from './typesense.constants'
import { TypesenseService } from './typesense.service'
import {
  TypesenseModuleAsyncOptions,
  TypesenseModuleOptions,
  TypesenseOptionsFactory,
} from './interfaces/typesense-module-options.interface'

@Module({
  providers: [TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule {
  static register(options: TypesenseModuleOptions): DynamicModule {
    return {
      module: TypesenseModule,
      providers: [{ provide: TYPESENSE_MODULE_OPTIONS, useValue: options }],
    }
  }

  static registerAsync(options: TypesenseModuleAsyncOptions): DynamicModule {
    return {
      module: TypesenseModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    }
  }

  private static createAsyncProviders(
    options: TypesenseModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        provide: options.useClass!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        useClass: options.useClass!,
      },
    ]
  }

  private static createAsyncOptionsProvider(
    options: TypesenseModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TYPESENSE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    return {
      provide: TYPESENSE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TypesenseOptionsFactory) =>
        await optionsFactory.createTypesenseOptions(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject: [(options.useExisting || options.useClass)!],
    }
  }
}

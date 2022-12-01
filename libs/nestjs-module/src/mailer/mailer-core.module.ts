import { ValueProvider } from '@nestjs/common/interfaces'
import { DynamicModule, Module, Global, Provider } from '@nestjs/common'

import { MAILER_OPTIONS } from './constants/mailer.constant'

import { MailerOptions } from './interfaces/mailer-options.interface'
import { MailerAsyncOptions } from './interfaces/mailer-async-options.interface'
import { MailerOptionsFactory } from './interfaces/mailer-options-factory.interface'

import { MailerService } from './mailer.service'

@Global()
@Module({})
export class MailerCoreModule {
  public static forRoot(options: MailerOptions): DynamicModule {
    const MailerOptionsProvider: ValueProvider<MailerOptions> = {
      provide: MAILER_OPTIONS,
      useValue: options,
    }

    return {
      module: MailerCoreModule,
      providers: [
        /** Options **/
        MailerOptionsProvider,

        /** Services **/
        MailerService,
      ],
      exports: [
        /** Services **/
        MailerService,
      ],
    }
  }

  public static forRootAsync(options: MailerAsyncOptions): DynamicModule {
    const providers: Provider[] = this.createAsyncProviders(options)

    return {
      module: MailerCoreModule,
      providers: [
        /** Providers **/
        ...providers,

        /** Services **/
        MailerService,

        /** Extra providers **/
        ...(options.extraProviders || []),
      ],
      imports: options.imports,
      exports: [
        /** Services **/
        MailerService,
      ],
    }
  }

  private static createAsyncProviders(options: MailerAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)]

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      })
    }

    return providers
  }

  private static createAsyncOptionsProvider(
    options: MailerAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MAILER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: MAILER_OPTIONS,
      useFactory: async (optionsFactory: MailerOptionsFactory) => {
        return optionsFactory.createMailerOptions()
      },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject: [options.useExisting! || options.useClass!],
    }
  }
}
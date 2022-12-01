/** Dependencies **/
import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import { Provider } from '@nestjs/common'

import { MailerOptions } from './mailer-options.interface'
import { MailerOptionsFactory } from './mailer-options-factory.interface'

export interface MailerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[]
  useClass?: Type<MailerOptionsFactory>
  useExisting?: Type<MailerOptionsFactory>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory?: (...args: any[]) => Promise<MailerOptions> | MailerOptions
  extraProviders?: Provider[]
}

import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Global, Module } from '@nestjs/common'

import { CONFIG_OPTIONS } from '../common/constants/common.constants'
import { IMailModuleOptions } from './mail.interfaces'
import { MailService } from './mails.service'

@Module({
  imports: [HttpModule],
})
@Global()
export class MailModule {
  static forRoot(options: IMailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    }
  }
}

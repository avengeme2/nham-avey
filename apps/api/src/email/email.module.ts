import path from 'node:path'

import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EjsAdapter, MailerModule } from '@nham-avey/nestjs-module'

import { EmailService } from './email.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('email.secret.user') as string
        const pass = configService.get<string>(
          'email.secret.password',
        ) as string
        const fromEmail = configService.get<string>('email.from') as string
        const sender = configService.get<string>('email.senderName') as string
        const templateDir = path.join(__dirname, 'email/templates')
        return {
          transport: {
            name: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            logger: false,
            debug: false,
            auth: {
              user,
              pass,
            },
          },
          defaults: {
            from: `${sender} <${fromEmail}>`,
          },
          template: {
            dir: templateDir,
            adapter: new EjsAdapter(),
            options: {
              strict: true,
              async: true,
            },
          },
        }
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

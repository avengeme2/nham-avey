import path from 'node:path'

import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EjsAdapter, MailerModule } from '@nham-avey/nestjs-module'

import { MailerConfig } from '../config/mailer.config'
import { DisposableDomainEmail } from './disposable-domain-email.entity'
import { EmailService } from './email.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [MailerConfig],
      useFactory: (mailerConfig: MailerConfig) => {
        const user = mailerConfig.AUTH_USER
        const pass = mailerConfig.AUTH_PASSWORD
        const fromEmail = mailerConfig.FROM
        const sender = mailerConfig.SENDER_NAME
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
    HttpModule,
    TypeOrmModule.forFeature([DisposableDomainEmail]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

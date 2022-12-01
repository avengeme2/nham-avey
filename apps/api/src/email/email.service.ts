import { Injectable } from '@nestjs/common'
import { MailerService } from '@nham-avey/nestjs-module'

import { SendEmailOptions } from './interfaces/send-email-options.interface'

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail({ subject, to, template, from, context }: SendEmailOptions) {
    return this.mailerService.sendMail({
      to,
      from,
      subject,
      template,
      context,
    })
  }
}

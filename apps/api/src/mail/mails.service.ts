import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import * as FormData from 'form-data'
import { firstValueFrom } from 'rxjs'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { IEmailVar, IMailModuleOptions } from 'src/mail/mail.interfaces'

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: IMailModuleOptions,
    private readonly httpService: HttpService,
  ) {}

  async sendEmail(
    subject: string,
    template: string,
    emailVars: IEmailVar[],
  ): Promise<boolean> {
    const form = new FormData()
    form.append('from', `Marley <mailgun@${this.options.domain}>`)
    form.append('to', 'a3333333@gmail.com')
    form.append('subject', subject)
    form.append('template', template)

    emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value))

    try {
      const _response = await axios.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        form,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
        },
      )
      return true
    } catch (error) {
      return false
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ])
  }

  async isDisposable(email: string): Promise<boolean> {
    const result = this.httpService.get('https://disposable.debounce.io', {
      params: { email },
    })
    const { data } = await firstValueFrom(result)
    return Promise.resolve(true)
  }
}

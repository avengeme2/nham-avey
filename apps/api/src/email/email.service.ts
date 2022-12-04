import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nham-avey/nestjs-module'
import { firstValueFrom } from 'rxjs'
import { Repository } from 'typeorm'

import { DisposableDomainEmail } from './disposable-domain-email.entity'
import { getDomainFromEmail } from './email.util'
import { SendEmailOptions } from './interfaces/send-email-options.interface'

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly httpService: HttpService,
    @InjectRepository(DisposableDomainEmail)
    private readonly disposableDomainEmailRepo: Repository<DisposableDomainEmail>,
  ) {}

  sendMail({ subject, to, template, from, context }: SendEmailOptions) {
    return this.mailerService.sendMail({
      to,
      from,
      subject,
      template,
      context,
    })
  }

  private async fetchIsDisposable(email: string): Promise<boolean> {
    const disposableServiceURL = 'https://disposable.debounce.io'
    const result = this.httpService.get<{ disposable: boolean }>(
      disposableServiceURL,
      {
        params: { email },
      },
    )
    const { data } = await firstValueFrom(result)
    return data.disposable
  }

  private saveDisposableDomain(domain: string) {
    const newDomainEntity = this.disposableDomainEmailRepo.create({ domain })
    return this.disposableDomainEmailRepo.save(newDomainEntity)
  }

  async getIsDisposable(email: string): Promise<boolean> {
    const domain = getDomainFromEmail(email)
    const exist = await this.disposableDomainEmailRepo.exist({
      where: { domain },
    })
    if (exist) {
      return true
    }

    const disposable = await this.fetchIsDisposable(email)
    if (disposable) {
      this.saveDisposableDomain(domain).then(_entity => {
        // eslint-disable-next-line no-console
        console.log(`${domain} is saved as disposable`) // TODO: use logger
      })
    }

    return disposable
  }
}

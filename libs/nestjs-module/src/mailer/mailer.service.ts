import { get, defaultsDeep } from 'lodash'
import { Injectable, Inject, Optional } from '@nestjs/common'
import { SentMessageInfo, Transporter } from 'nodemailer'
import previewEmail from 'preview-email'
import smtpTransport from 'nodemailer/lib/smtp-transport'

import {
  MAILER_OPTIONS,
  MAILER_TRANSPORT_FACTORY,
} from './constants/mailer.constant'

import { MailerOptions } from './interfaces/mailer-options.interface'
import { TemplateAdapter } from './interfaces/template-adapter.interface'
import { ISendMailOptions } from './interfaces/send-mail-options.interface'
import { MailerTransportFactory as IMailerTransportFactory } from './interfaces/mailer-transport-factory.interface'
import { MailerTransportFactory } from './mailer-transport.factory'

@Injectable()
export class MailerService {
  private transporter!: Transporter
  private transporters = new Map<string, Transporter>()
  private templateAdapter: TemplateAdapter
  private initTemplateAdapter(
    templateAdapter: TemplateAdapter,
    transporter: Transporter,
  ): void {
    if (templateAdapter) {
      transporter.use('compile', (mail, callback) => {
        if (mail.data.html) {
          return callback()
        }

        return templateAdapter.compile(mail, callback, this.mailerOptions)
      })

      if (this.mailerOptions.preview) {
        transporter.use('stream', (mail, callback) => {
          return previewEmail(
            mail.data,
            this.mailerOptions.preview as previewEmail.Options,
          )
            .then(() => callback())
            .catch(callback)
        })
      }
    }
  }

  constructor(
    @Inject(MAILER_OPTIONS) private readonly mailerOptions: MailerOptions,
    @Optional()
    @Inject(MAILER_TRANSPORT_FACTORY)
    private readonly transportFactory: IMailerTransportFactory,
  ) {
    if (!transportFactory) {
      this.transportFactory = new MailerTransportFactory(mailerOptions)
    }
    if (
      (!mailerOptions.transport ||
        Object.keys(mailerOptions.transport).length <= 0) &&
      !mailerOptions.transports
    ) {
      throw new Error(
        'Make sure to provide a nodemailer transport configuration object, connection url or a transport plugin instance.',
      )
    }

    /** Adapter setup **/
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.templateAdapter = get(this.mailerOptions, 'template.adapter')!

    /*
     * Preview setup
     * THIS NEED TO RUN BEFORE ANY CALL TO `initTemplateAdapter`
     */
    if (this.mailerOptions.preview) {
      const defaults = { open: { wait: false } }
      this.mailerOptions.preview =
        typeof this.mailerOptions.preview === 'boolean'
          ? defaults
          : defaultsDeep(this.mailerOptions.preview, defaults)
    }

    /** Transporters setup **/
    if (mailerOptions.transports) {
      Object.keys(mailerOptions.transports).forEach(name => {
        this.transporters.set(
          name,
          this.transportFactory.createTransport(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.mailerOptions.transports![name],
          ),
        )
        this.initTemplateAdapter(
          this.templateAdapter,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.transporters.get(name)!,
        )
      })
    }

    /** Transporter setup **/
    if (mailerOptions.transport) {
      this.transporter = this.transportFactory.createTransport()
      this.initTemplateAdapter(this.templateAdapter, this.transporter)
    }
  }

  public async sendMail(
    sendMailOptions: ISendMailOptions,
  ): Promise<SentMessageInfo> {
    if (sendMailOptions.transporterName) {
      if (
        this.transporters &&
        this.transporters.get(sendMailOptions.transporterName)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return await this.transporters
          .get(sendMailOptions.transporterName)!
          .sendMail(sendMailOptions)
      } else {
        throw new ReferenceError(
          `Transporters object doesn't have ${sendMailOptions.transporterName} key`,
        )
      }
    } else {
      if (this.transporter) {
        return await this.transporter.sendMail(sendMailOptions)
      } else {
        throw new ReferenceError(`Transporter object undefined`)
      }
    }
  }

  addTransporter(
    transporterName: string,
    config: string | smtpTransport | smtpTransport.Options,
  ): string {
    this.transporters.set(
      transporterName,
      this.transportFactory.createTransport(config),
    )
    this.initTemplateAdapter(
      this.templateAdapter,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.transporters.get(transporterName)!,
    )
    return transporterName
  }
}

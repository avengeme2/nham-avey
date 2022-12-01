import { MailerOptions } from './mailer-options.interface'

export interface TemplateAdapter {
  compile(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mail: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (err?: any, body?: string) => any,
    options: MailerOptions,
  ): void
}

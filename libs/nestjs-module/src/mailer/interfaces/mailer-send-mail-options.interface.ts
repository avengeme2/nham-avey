/** Dependencies **/
import { SendMailOptions } from 'nodemailer'

export interface MailerSendMailOptions extends SendMailOptions {
  template?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any
}

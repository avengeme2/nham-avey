import { SendMailOptions } from 'nodemailer'
import DKIM from 'nodemailer/lib/dkim'

export type TextEncoding = 'quoted-printable' | 'base64'
export type Headers =
  | { [key: string]: string | string[] | { prepared: boolean; value: string } }
  | Array<{ key: string; value: string }>

export interface Address {
  name: string
  address: string
}

export interface AttachmentLikeObject {
  path: string
}

export interface ISendMailOptions extends SendMailOptions {
  to?: string | Address | Array<string | Address>
  cc?: string | Address | Array<string | Address>
  bcc?: string | Address | Array<string | Address>
  replyTo?: string | Address
  inReplyTo?: string | Address
  from?: string | Address
  subject?: string
  text?: string | Buffer | AttachmentLikeObject
  html?: string | Buffer
  sender?: string | Address
  raw?: string | Buffer
  textEncoding?: TextEncoding
  references?: string | string[]
  encoding?: string
  date?: Date | string
  headers?: Headers
  context?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any
  }
  transporterName?: string
  template?: string
  attachments?: {
    filename: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any
    path?: string
    contentType?: string
    cid?: string
    encoding?: string
    contentDisposition?: 'attachment' | 'inline' | undefined
    href?: string
  }[]
  dkim?: DKIM.Options
}

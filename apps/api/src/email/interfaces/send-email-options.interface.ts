export interface SendEmailOptions {
  from?: string
  to: string
  subject: string
  template: string
  context?: {
    [name: string]: any
  }
}

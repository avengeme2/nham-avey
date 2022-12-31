import { IsNotEmpty, IsString } from 'class-validator'

export class MailerConfig {
  @IsString()
  @IsNotEmpty()
  readonly AUTH_USER: string

  @IsString()
  @IsNotEmpty()
  readonly AUTH_PASSWORD: string

  @IsString()
  @IsNotEmpty()
  readonly FROM: string

  @IsString()
  @IsNotEmpty()
  readonly SENDER_NAME: string
}

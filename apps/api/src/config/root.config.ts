import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator'

import { TransformBoolean } from '../common/decorators/transformers/transform-boolean.decorator'
import { TransformNumber } from '../common/decorators/transformers/transform-number.decorator'
import { DatabaseConfig } from './database.config'
import { FirebaseAdminConfig } from './firebase-admin.config'
import { MailerConfig } from './mailer.config'

export class RootConfig {
  @IsString()
  @IsNotEmpty()
  readonly NODE_ENV: string = 'development'

  get isDev(): boolean {
    return this.NODE_ENV === 'development'
  }

  @IsNotEmpty()
  @IsNumber()
  @TransformNumber()
  readonly PORT: number

  @IsString()
  readonly HOST: string = 'http://localhost'

  @IsString()
  @IsNotEmpty()
  readonly SERVER_API_KEY: string

  @IsBoolean()
  @IsNotEmpty()
  @TransformBoolean()
  readonly ENABLE_SWAGGER: boolean

  @IsString()
  @IsNotEmpty()
  readonly REDIS_URL: string

  @IsString()
  @IsNotEmpty()
  readonly SENTRY_DSN: string

  get url(): string {
    return `${this.HOST}:${this.PORT}`
  }

  @ValidateNested()
  @Type(() => FirebaseAdminConfig)
  @IsNotEmpty()
  readonly FIREBASE_ADMIN: FirebaseAdminConfig

  @ValidateNested()
  @Type(() => DatabaseConfig)
  @IsNotEmpty()
  readonly DATABASE: DatabaseConfig

  @ValidateNested()
  @Type(() => MailerConfig)
  @IsNotEmpty()
  readonly MAILER: MailerConfig
}

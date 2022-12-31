import { IsNotEmpty, IsString } from 'class-validator'
import { LoggerOptions } from 'typeorm/logger/LoggerOptions'

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  readonly URL: string

  // TODO: create one of these for each type of logger validation
  @IsNotEmpty()
  readonly LOGGING: LoggerOptions
}

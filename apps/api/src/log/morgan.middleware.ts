import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as morgan from 'morgan'

export enum MorganFormatType {
  Combined = 'combined',
  Common = 'common',
  Dev = 'dev',
  Short = 'short',
  Tiny = 'tiny',
}

export type MorganFormat =
  | MorganFormatType
  | string
  | morgan.FormatFn<Request, Response>

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  public static configure(
    format: MorganFormat,
    opts: morgan.Options<Request, Response> = {},
  ) {
    this.format = format
    this.options = opts
  }

  public static token(
    name: string,
    callback: morgan.TokenCallbackFn<Request, Response>,
  ): morgan.Morgan<Request, Response> {
    return morgan.token(name, callback)
  }

  private static options: morgan.Options<Request, Response>
  private static format: MorganFormat = MorganFormatType.Combined

  use(req: Request, res: Response, next: NextFunction) {
    if (MorganMiddleware.format) {
      morgan(
        MorganMiddleware.format as morgan.FormatFn<Request, Response>,
        MorganMiddleware.options,
      )(req, res, next)
    } else {
      throw new Error(
        'MorganMiddleware must be configured with a logger format.',
      )
    }
  }
}

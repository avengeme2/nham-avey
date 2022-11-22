import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import {
  responseTime,
  ResponseTimeOptions,
} from '../../core/middlewares/response-time.middleware'

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  public static configure(opts: ResponseTimeOptions) {
    this.options = opts
  }

  private static options: ResponseTimeOptions

  use(req: Request, res: Response, next: NextFunction) {
    if (ResponseTimeMiddleware.options) {
      responseTime(ResponseTimeMiddleware.options)(req, res, next)
    } else {
      responseTime()(req, res, next)
    }
  }
}

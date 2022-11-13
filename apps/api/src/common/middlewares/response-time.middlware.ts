import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import responseTime from 'response-time'

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  public static configure(opts: responseTime.ResponseTimeOptions) {
    this.options = opts
  }

  private static options: responseTime.ResponseTimeOptions

  use(req: Request, res: Response, next: NextFunction) {
    if (ResponseTimeMiddleware.options) {
      responseTime(ResponseTimeMiddleware.options)(req, res, next)
    } else {
      responseTime()(req, res, next)
    }
  }
}

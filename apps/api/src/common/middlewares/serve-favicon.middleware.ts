import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as serveFavicon from 'serve-favicon'

/**
 * need to exclude security such as api-key, auth, etc.
 * in order to serve favicon as public
 */
@Injectable()
export class ServeFaviconMiddleware implements NestMiddleware {
  public static configure(path: string, opts?: serveFavicon.Options) {
    this.path = path
    this.options = opts
  }

  private static path: string
  private static options?: serveFavicon.Options

  use(req: Request, res: Response, next: NextFunction) {
    if (ServeFaviconMiddleware.path) {
      serveFavicon(ServeFaviconMiddleware.path, ServeFaviconMiddleware.options)(
        req,
        res,
        next,
      )
    } else {
      throw new Error('ServeFaviconMiddleware requires a path in configure.')
    }
  }
}

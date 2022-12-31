import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

import { API_KEY_HEADER } from '../common/constants/common.constants'
import { RootConfig } from '../config/root.config'

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly rootConfig: RootConfig) {}

  use(req: Request, res: Response, next: NextFunction) {
    const serverApiKey = this.rootConfig.SERVER_API_KEY
    const apiKey = req.headers[API_KEY_HEADER]
    if (!apiKey) {
      throw new BadRequestException(`${API_KEY_HEADER} header is required`)
    }
    if (apiKey !== serverApiKey) {
      throw new UnauthorizedException('Invalid API key')
    }
    next()
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { FirebaseAuthenticationService } from '@nham-avey/nestjs-module'
import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'
import { DecodedIdToken } from 'firebase-admin/auth'

import { User, UserRole } from '../users/entities/user.entity'
import { UserService } from '../users/user.service'

export interface UserClaims extends DecodedIdToken {
  roles?: UserRole[]
}

export interface RequestWithUser extends Request {
  user?: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private readonly userService: UserService,
  ) {}

  public static validateAndGetToken(bearerToken: string): string {
    const match = bearerToken.match(/^Bearer (.*)$/)
    if (!match || match.length < 2) {
      throw new UnauthorizedException(
        'Invalid Authorization token - Token does not match Bearer schema',
      )
    }
    return match[1]
  }

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (!authorization) {
      return next()
    }

    try {
      const accessToken = AuthMiddleware.validateAndGetToken(
        authorization as string,
      )
      const decodedIdToken = await this.firebaseAuthService.auth.verifyIdToken(
        accessToken,
      )
      const user = await this.userService.findUserById(decodedIdToken.uid)
      if (!user) {
        throw new UnauthorizedException('User not found')
      }

      req.user = user
      Sentry.setUser(
        user, // TODO: align with https://docs.sentry.io/platforms/node/guides/express/enriching-events/identify-user/
      )
      next()
    } catch (err: any) {
      if (err?.code === 'auth/id-token-expired') {
        throw new UnauthorizedException(err, err?.message)
      }
      throw new InternalServerErrorException(err, err?.message)
    }
  }
}

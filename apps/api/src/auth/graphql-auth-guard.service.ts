import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { FirebaseAuthenticationService } from '@nham-avey/nestjs-module'

import { AUTHORIZATION_HEADER } from '../common/constants/common.constants'
import { UserRole } from '../users/entities/user.entity'
import { UserService } from '../users/user.service'
import { AuthMiddleware } from './auth.middleware'

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler())
    if (!roles?.length) {
      return true
    }

    const gqlContext = GqlExecutionContext.create(context).getContext()
    const authorization = gqlContext[AUTHORIZATION_HEADER]
    if (!authorization) {
      throw new BadRequestException('Authorization Header is Required')
    }

    const accessToken = AuthMiddleware.validateAndGetToken(
      authorization as string,
    )
    try {
      const decodedIdToken = await this.firebaseAuthService.verifyIdToken(
        accessToken,
      )
      const user = await this.userService.findUserById(decodedIdToken.uid)
      if (!user) {
        throw new UnauthorizedException('User not found')
      }
      gqlContext['user'] = user
      return (
        user?.roles?.some((role: UserRole) => roles.includes(role)) || false
      )
    } catch (err: any) {
      if (err?.code === 'auth/id-token-expired') {
        throw new UnauthorizedException(err, err?.message)
      }
      throw new InternalServerErrorException(err, (err as Error)?.message)
    }
  }
}

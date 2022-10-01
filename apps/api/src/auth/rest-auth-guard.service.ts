import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FirebaseAuthenticationService } from '@nham-avey/nestjs-module'

import { UserRole } from '../users/entities/user.entity'
import { RequestWithUser } from './auth.middleware'

@Injectable()
export class RestAuthGuard implements CanActivate {
  @Inject(FirebaseAuthenticationService)
  private readonly firebaseAuthService: FirebaseAuthenticationService
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler())
    if (!roles?.length) {
      return true
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const { user } = request
    return user?.roles?.some(role => roles.includes(role)) || false
  }
}

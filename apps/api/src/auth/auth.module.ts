import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { UserModule } from '../users/user.module'
import { GraphqlAuthGuard } from './graphql-auth-guard.service'

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GraphqlAuthGuard,
    },
  ],
})
export class AuthModule {}

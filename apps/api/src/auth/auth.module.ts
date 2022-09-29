import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { UsersModule } from '../users/users.module'
import { GraphqlAuthGuard } from './graphql-auth-guard.service'

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GraphqlAuthGuard,
    },
  ],
})
export class AuthModule {}

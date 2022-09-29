import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { AdminResolver } from './resolvers/admins.resolver'
import { CommonUserResolver } from './resolvers/common-users.resolver'
import { DriverResolver } from './resolvers/drivers.resolver'
import { VendorResolver } from './resolvers/vendors.resolver'
import { UserService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    CommonUserResolver,
    AdminResolver,
    VendorResolver,
    DriverResolver,
  ],
  exports: [UserService],
})
export class UsersModule {}

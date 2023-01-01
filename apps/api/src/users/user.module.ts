import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EmailModule } from '../email/email.module'
import { User } from './entities/user.entity'
import { AdminResolver } from './resolvers/admin.resolver'
import { CommonUserResolver } from './resolvers/common-user.resolver'
import { DriverResolver } from './resolvers/driver.resolver'
import { VendorResolver } from './resolvers/vendor.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  providers: [
    UserService,
    CommonUserResolver,
    AdminResolver,
    VendorResolver,
    DriverResolver,
  ],
  exports: [UserService],
})
export class UserModule {}

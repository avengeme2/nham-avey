import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { User } from '../users/entities/user.entity'
import { UsersModule } from '../users/users.module'
import { Payment } from './payment.entity'
import { PaymentResolver } from './payments.resolver'
import { PaymentService } from './payments.service'

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant, User]), UsersModule],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentsModule {}

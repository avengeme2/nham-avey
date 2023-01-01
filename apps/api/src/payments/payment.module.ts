import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { User } from '../users/entities/user.entity'
import { UserModule } from '../users/user.module'
import { Payment } from './payment.entity'
import { PaymentResolver } from './payment.resolver'
import { PaymentService } from './payment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant, User]), UserModule],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}

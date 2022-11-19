import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { parse } from 'pg-connection-string'
import { LoggerOptions } from 'typeorm/logger/LoggerOptions'

import { Category } from '../categories/category.entity'
import { City } from '../cities/city.entity'
import { Dish } from '../dishes/dish.entity'
import { Image } from '../images/entities/image.entity'
import { Location } from '../locations/location.entity'
import { OrderItem } from '../orders/entities/order-item.entity'
import { Order } from '../orders/entities/order.entity'
import { Payment } from '../payments/payment.entity'
import { OpeningHours } from '../restaurants/entities/opening-hours.entity'
import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { Review } from '../restaurants/entities/review.entity'
import { User } from '../users/entities/user.entity'
import { SnakeNamingStrategy } from './snake-naming.strategy'

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, database, user, password } = parse(
      this.config.get<string>('db.url') as string,
    )
    const isLocalHost =
      host?.includes('127.0.0.1') || host?.includes('localhost')

    return {
      type: 'postgres',
      host: host as string,
      port: +(port || 5432) as number,
      database: database as string,
      username: user,
      password,
      entities: [
        User,
        Restaurant,
        Category,
        Dish,
        Order,
        OrderItem,
        Payment,
        City,
        Location,
        OpeningHours,
        Review,
        Image,
      ],
      migrations: [],
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
      logger: 'advanced-console',
      logging: this.config.get<LoggerOptions>('db.logging'),
      synchronize: false,
      keepConnectionAlive: !this.config.get('isProd'),
      ...(!isLocalHost && {
        ssl: {
          rejectUnauthorized: false, // this should be true outside heroku!
        },
      }),
      cache: {
        duration: 1500, // override default 1000ms
        type: 'ioredis',
        options: this.config.get('REDIS_URL'),
      },
    }
  }
}

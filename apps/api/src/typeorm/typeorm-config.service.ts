import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { Category } from '../categories/category.entity'
import { City } from '../cities/city.entity'
import { parsePGConnectionString } from '../common/utils/database.util'
import { DatabaseConfig } from '../config/database.config'
import { RootConfig } from '../config/root.config'
import { Dish } from '../dishes/dish.entity'
import { DisposableDomainEmail } from '../email/disposable-domain-email.entity'
import { GeoLocation } from '../geo-locations/geo-location.entity'
import { Image } from '../images/entities/image.entity'
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
  constructor(
    private readonly databaseConfig: DatabaseConfig,
    private readonly rootConfig: RootConfig,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbURL = this.databaseConfig.URL
    const { host, port, database, user, password } =
      parsePGConnectionString(dbURL)
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
        GeoLocation,
        OpeningHours,
        Review,
        Image,
        DisposableDomainEmail,
      ],
      migrations: [],
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
      logger: 'advanced-console',
      logging: this.databaseConfig.LOGGING,
      synchronize: false,
      keepConnectionAlive: this.rootConfig.isDev,
      ...(!isLocalHost && {
        ssl: {
          rejectUnauthorized: false, // this should be true outside heroku!
        },
      }),
      cache: !this.rootConfig.isDev && {
        duration: 1500, // override default 1000ms
        type: 'ioredis',
        options: this.rootConfig.REDIS_URL,
      },
    }
  }
}

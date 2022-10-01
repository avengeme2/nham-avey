import * as path from 'path'

import { ApolloDriver } from '@nestjs/apollo'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FirebaseAdminModule } from '@nham-avey/nestjs-module'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { cert } from 'firebase-admin/app'
import * as Joi from 'joi'

import { ApiKeyMiddleware } from '../auth/api-key.middleware'
import { AuthMiddleware } from '../auth/auth.middleware'
import { AuthModule } from '../auth/auth.module'
import { CategoryModule } from '../categories/categories.module'
import { CityModule } from '../cities/cities.module'
import { CommonModule } from '../common/common.module'
import {
  AUTHORIZATION_HEADER,
  GRAPHQL_PATH,
  SWAGGER_PATH,
} from '../common/constants/common.constants'
import { ResponseTimeMiddleware } from '../common/middlewares/response-time.middlware'
import { ServeFaviconMiddleware } from '../common/middlewares/serve-favicon.middleware'
import { EnhancedDate } from '../common/scalar/enhanced-date.scalar'
import configuration from '../config/configuration'
import { DishModule } from '../dishes/dishes.module'
import { FileUploadsModule } from '../file-uploads/file-uploads.module'
import { ImagesModule } from '../images/images.module'
import { MorganFormatType, MorganMiddleware } from '../log/morgan.middleware'
import { MailModule } from '../mail/mails.module'
import { OrdersModule } from '../orders/orders.module'
import { PaymentsModule } from '../payments/payments.module'
import { RestaurantsModule } from '../restaurants/restaurants.module'
import { TypeormConfigService } from '../typeorm/typeorm-config.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        FIREBASE_STORAGE_BUCKET_URL: Joi.string().required(),
        DATABASE_LOGGING: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          installSubscriptionHandlers: true,
          playground: false,
          introspection: true,
          plugins: [
            config.get('isProd')
              ? ApolloServerPluginLandingPageProductionDefault()
              : ApolloServerPluginLandingPageLocalDefault(),
          ],
          sortSchema: true,
          autoSchemaFile: path.join(process.cwd(), 'apps/api/src/schema.gql'),
          context: ({ req, connection }: ApolloServer['context']) => {
            return {
              [AUTHORIZATION_HEADER]: req
                ? req.headers[AUTHORIZATION_HEADER]
                : connection.context[AUTHORIZATION_HEADER],
            }
          },
        }
      },
    }),
    ScheduleModule.forRoot(),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY as string,
      domain: process.env.MAILGUN_DOMAIN_NAME as string,
      fromEmail: process.env.MAILGUN_FROM_EMAIL as string,
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const serviceAccount = configService.get('firebase.serviceAccount')
        const storageBucket = configService.get('firebase.bucketUrl')
        return {
          credential: cert(serviceAccount),
          storageBucket,
        }
      },
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    CategoryModule,
    CityModule,
    DishModule,
    OrdersModule,
    CommonModule,
    PaymentsModule,
    FileUploadsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [
    EnhancedDate, // override default graphql date since default one doesn't parse date from string
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // middleware configs
    MorganMiddleware.configure(MorganFormatType.Dev)
    ServeFaviconMiddleware.configure(
      path.resolve(__dirname, 'assets/favicon.ico'),
    )

    consumer
      .apply(ApiKeyMiddleware)
      .exclude({ path: 'favicon.ico', method: RequestMethod.GET })
      .exclude({ path: SWAGGER_PATH, method: RequestMethod.ALL })
      .exclude({ path: GRAPHQL_PATH, method: RequestMethod.ALL }) // TODO: remove this line when include api key from the frontend
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(AuthMiddleware)
      .exclude({ path: 'graphql', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(ResponseTimeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(ServeFaviconMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}

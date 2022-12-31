import path from 'node:path'

import { ApolloDriver } from '@nestjs/apollo'
import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  ConfigModule,
  dotenvLoader,
  FirebaseAdminModule,
  SentryGraphqlInterceptor,
  SentryInterceptor,
  SentryModule,
} from '@nham-avey/nestjs-module'
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import * as Tracing from '@sentry/tracing'
import { cert } from 'firebase-admin/app'

import { ApiKeyMiddleware } from '../auth/api-key.middleware'
import { AuthMiddleware } from '../auth/auth.middleware'
import { AuthModule } from '../auth/auth.module'
import { CategoryModule } from '../categories/categories.module'
import { CityModule } from '../cities/cities.module'
import { CommonModule } from '../common/common.module'
import {
  GRAPHQL_PATH,
  SWAGGER_PATH,
} from '../common/constants/common.constants'
import { ResponseTimeMiddleware } from '../common/middlewares/response-time.middleware'
import { ServeFaviconMiddleware } from '../common/middlewares/serve-favicon.middleware'
import { EnhancedDate } from '../common/scalar/enhanced-date.scalar'
import { FirebaseAdminConfig } from '../config/firebase-admin.config'
import { RootConfig } from '../config/root.config'
import { DishModule } from '../dishes/dishes.module'
import { FileUploadsModule } from '../file-uploads/file-uploads.module'
import { GraphqlConfigService } from '../graphql/graphql-config.service'
import { ImagesModule } from '../images/images.module'
import { OrdersModule } from '../orders/orders.module'
import { PaymentsModule } from '../payments/payments.module'
import { RestaurantsModule } from '../restaurants/restaurants.module'
import { TypeormConfigService } from '../typeorm/typeorm-config.service'
import { UsersModule } from '../users/users.module'

const envFilePath = path.resolve(process.cwd(), '.env')

@Module({
  imports: [
    ConfigModule.forRoot({
      schema: RootConfig,
      load: dotenvLoader({
        envFilePath,
        separator: '__',
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlConfigService,
    }),
    ScheduleModule.forRoot(),
    SentryModule.forRootAsync({
      inject: [RootConfig],
      useFactory: (rootConfig: RootConfig) => ({
        dsn: rootConfig.SENTRY_DSN,
        environment: rootConfig.NODE_ENV,
        tracesSampleRate: 1.0,
        integrations: [
          // enable HTTP calls tracing
          new Sentry.Integrations.Http({ tracing: true }),
          // enable Express.js middleware tracing
          new Tracing.Integrations.Express(), // TODO: check app instance
          new Tracing.Integrations.Postgres(),
          new Tracing.Integrations.Apollo(),
          new ProfilingIntegration(),
        ],
      }),
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      inject: [FirebaseAdminConfig],
      useFactory: (firebaseAdminConfig: FirebaseAdminConfig) => {
        const serviceAccount = firebaseAdminConfig.serviceAccount
        const storageBucket = firebaseAdminConfig.STORAGE_BUCKET_URL
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
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              type: HttpException,
              filter: (exception: HttpException) => 500 > exception.getStatus(), // Only report 500 errors
            },
          ],
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new SentryGraphqlInterceptor(),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // middleware configs
    ServeFaviconMiddleware.configure(
      path.resolve(__dirname, 'assets/favicon.ico'),
    )

    consumer
      .apply(ApiKeyMiddleware)
      .exclude({ path: 'favicon.ico', method: RequestMethod.GET })
      .exclude({ path: SWAGGER_PATH, method: RequestMethod.ALL })
      .exclude({
        path: GRAPHQL_PATH,
        method: RequestMethod.ALL,
      }) // TODO: remove this line when include api key from the frontend
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(AuthMiddleware)
      .exclude({ path: 'graphql', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(ResponseTimeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(ServeFaviconMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}

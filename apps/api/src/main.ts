import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import compression from 'compression'

import { AppModule } from './app/app.module'
import { createSwagger } from './common/common.helpers'
import { RootConfig } from './config/root.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api/v1'
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(compression())
  app.enableCors()

  const rootConfig = app.get(RootConfig)
  const port: number = rootConfig.PORT || 3333

  const showSwagger = rootConfig.ENABLE_SWAGGER
  if (showSwagger) {
    await createSwagger(app)
  }

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler())
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler())

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler())

  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()

import { ExecutionContext, Injectable } from '@nestjs/common'
import type { GqlContextType } from '@nestjs/graphql'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Handlers, Scope } from '@sentry/node'

import { SentryInterceptor } from '.'

@Injectable()
export class GraphqlInterceptor extends SentryInterceptor {
  protected override captureException(
    context: ExecutionContext,
    scope: Scope,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exception: any,
  ) {
    if (context.getType<GqlContextType>() === 'graphql') {
      this.captureGraphqlException(
        scope,
        GqlExecutionContext.create(context),
        exception,
      )
    } else {
      super.captureException(context, scope, exception)
    }
  }

  private captureGraphqlException(
    scope: Scope,
    gqlContext: GqlExecutionContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exception: any,
  ): void {
    const info = gqlContext.getInfo()
    const context = gqlContext.getContext()

    scope.setExtra('type', info.parentType.name)

    if (context.req) {
      // req within graphql context needs modification in
      // TODO: Fix this
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = Handlers.parseRequest(<any>{}, context.req, {})

      scope.setExtra('req', data.request)

      if (data.extra) {
        scope.setExtras(data.extra)
      }
      if (data.user) {
        scope.setUser(data.user)
      }
    }

    this.client.instance().captureException(exception)
  }
}

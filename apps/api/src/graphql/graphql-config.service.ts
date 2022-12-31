import path from 'node:path'

import { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory } from '@nestjs/graphql'
import * as Sentry from '@sentry/node'
import {
  ApolloError,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
  GraphQLRequestContext,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import {
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base'

import { AUTHORIZATION_HEADER } from '../common/constants/common.constants'
import { RootConfig } from '../config/root.config'

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(private readonly rootConfig: RootConfig) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      installSubscriptionHandlers: true,
      playground: false,
      introspection: true,
      plugins: [
        this.rootConfig.isDev
          ? ApolloServerPluginLandingPageLocalDefault()
          : ApolloServerPluginLandingPageProductionDefault(),
        {
          requestDidStart(
            _requestContext: GraphQLRequestContext,
          ): Promise<GraphQLRequestListener | void> {
            /* Within this returned object, define functions that respond
               to request-specific lifecycle events. */
            return Promise.resolve({
              didEncounterErrors(
                ctx: GraphQLRequestContextDidEncounterErrors<any>,
              ): Promise<void> {
                // If we couldn't parse the operation, don't
                // do anything here
                if (!ctx.operation) {
                  return Promise.resolve()
                }

                for (const err of ctx.errors) {
                  // Only report internal server errors,
                  // all errors extending ApolloError should be user-facing
                  if (err instanceof ApolloError) {
                    continue
                  }

                  // Add scoped report details and send to Sentry
                  Sentry.withScope(scope => {
                    // Annotate whether failing operation was query/mutation/subscription
                    scope.setTag('kind', ctx.operation?.operation)

                    // Log query and variables as extras (make sure to strip out sensitive data!)
                    scope.setExtra('query', ctx.request.query)
                    scope.setExtra('variables', ctx.request.variables)

                    if (err.path) {
                      // We can also add the path as breadcrumb
                      scope.addBreadcrumb({
                        category: 'query-path',
                        message: err.path.join(' > '),
                        level: 'debug',
                      })
                    }

                    const transactionId =
                      ctx.request.http?.headers.get('x-transaction-id')
                    if (transactionId) {
                      scope.setTransactionName(transactionId)
                    }

                    Sentry.captureException(err)
                  })
                }

                return Promise.resolve()
              },
            })
          },
        },
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
  }
}

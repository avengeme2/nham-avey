import path from 'node:path'

import { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlOptionsFactory } from '@nestjs/graphql'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'

import { AUTHORIZATION_HEADER } from '../common/constants/common.constants'

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      installSubscriptionHandlers: true,
      playground: false,
      introspection: true,
      plugins: [
        this.configService.get('isProd')
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
  }
}

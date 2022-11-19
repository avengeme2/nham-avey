import { parse } from 'pg-connection-string'
import { DataSource } from 'typeorm'

import { SnakeNamingStrategy } from './snake-naming.strategy'

export const getDatasource = (type: 'migrations' | 'seeds') => {
  const { host, port, database, user, password } = parse(
    process.env.DATABASE_URL as string,
  )
  const isLocalhost = host?.includes('127.0.0.1') || host?.includes('localhost')

  return new DataSource({
    type: 'postgres',
    host: host as string,
    port: +(port || 5432) as number,
    database: database as string,
    username: user,
    password,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    dropSchema: true,
    logging: process.env.NODE_ENV !== 'production',
    migrationsTableName: type,
    entities: [`${__dirname}/../../**/**.entity{.ts,.js}`],
    migrations: [`${__dirname}/${type}/**/*{.ts,.js}`],
    ...(!isLocalhost && {
      ssl: {
        rejectUnauthorized: false, // this should be true outside heroku!
      },
    }),
  })
}

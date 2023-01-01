import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: '../../libs/common/**/*.gql',
  generates: {
    './src/__generated__/grapql.react-query.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          func: './../utils/graphql-fetcher#fetchData',
          isReactHook: false,
        },
      },
    },
  },
}
export default config

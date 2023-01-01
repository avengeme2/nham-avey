import axios from 'axios'

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  _options?: RequestInit['headers'],
): (() => Promise<TData>) => {
  return async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HTTP_GRAPHQL_URI as string,
      {
        query,
        variables,
      },
      {
        // TODO
        // headers: {
        //   ...options,
        // },
      },
    )

    const { data } = response.data

    if (data.error) {
      throw new Error(data.error)
    }

    return data
  }
}

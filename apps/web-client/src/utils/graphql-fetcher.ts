import axios from 'axios'

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  _options?: RequestInit['headers'],
): (() => Promise<TData>) => {
  return async () => {
    const response = await axios.post(
      'http://localhost:3000/graphql',
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

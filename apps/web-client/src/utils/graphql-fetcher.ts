import axios from 'axios'

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  _options?: RequestInit['headers'],
): (() => Promise<TData>) => {
  return async () => {
    const { data } = await axios.post(
      'https://localhost:3000/graphql',
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

    if (data.errors) {
      const { message } = data.errors[0] || {}
      throw new Error(message || 'Error…')
    }

    return data
  }
}

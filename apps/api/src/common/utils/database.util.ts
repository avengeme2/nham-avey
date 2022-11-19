import fs from 'node:fs'
import url from 'node:url'

export interface ConnectionOptions {
  host: string | null
  password?: string
  user?: string
  port?: string | null
  database: string | null | undefined
  client_encoding?: string
  ssl?: boolean | string

  application_name?: string
  fallback_application_name?: string
  options?: string
}

export const parsePGConnectionString = (string: string): ConnectionOptions => {
  //unix socket
  if (string.charAt(0) === '/') {
    const config = string.split(' ')
    return { host: config[0], database: config[1] }
  }

  // url parse expects spaces encoded as %20
  const result = url.parse(
    / |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(string)
      ? encodeURI(string).replace(/%25(\d\d)/g, '%$1')
      : string,
    true,
  )
  const config = result.query as Record<string, any>
  for (const k in config) {
    if (Array.isArray(config[k])) {
      config[k] = config?.[k]?.[(config[k]?.length as number) - 1]
    }
  }

  const auth = (result.auth || ':').split(':')
  config.user = auth[0]
  config.password = auth.splice(1).join(':')

  config.port = result.port as string
  if (result.protocol === 'socket:') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.host = decodeURI(result.pathname!)
    config.database = result.query.db
    config.client_encoding = result.query.encoding
    return config as ConnectionOptions
  }
  if (!config.host) {
    // Only set the host if there is no equivalent query param.
    config.host = result.hostname as string
  }

  // If the host is missing it might be a URL-encoded path to a socket.
  let pathname = result.pathname
  if (!config.host && pathname && /^%2f/i.test(pathname)) {
    const pathnameSplit = pathname.split('/')
    config.host = decodeURIComponent(pathnameSplit[0])
    pathname = pathnameSplit.splice(1).join('/')
  }
  // result.pathname is not always guaranteed to have a '/' prefix (e.g. relative urls)
  // only strip the slash if it is present.
  if (pathname && pathname.charAt(0) === '/') {
    pathname = pathname.slice(1) || null
  }
  config.database = (pathname && decodeURI(pathname)) as string

  if (config.ssl === 'true' || config.ssl === '1') {
    config.ssl = true
  }

  if (config.ssl === '0') {
    config.ssl = false
  }

  if (config.sslcert || config.sslkey || config.sslrootcert || config.sslmode) {
    config.ssl = {}
  }

  if (config.sslcert) {
    config.ssl.cert = fs.readFileSync(config.sslcert).toString()
  }

  if (config.sslkey) {
    config.ssl.key = fs.readFileSync(config.sslkey).toString()
  }

  if (config.sslrootcert) {
    config.ssl.ca = fs.readFileSync(config.sslrootcert).toString()
  }

  switch (config.sslmode) {
    case 'disable': {
      config.ssl = false
      break
    }
    case 'prefer':
    case 'require':
    case 'verify-ca':
    case 'verify-full': {
      break
    }
    case 'no-verify': {
      config.ssl.rejectUnauthorized = false
      break
    }
  }

  return config as ConnectionOptions
}

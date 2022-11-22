import { Request, Response, NextFunction } from 'express'
import onHeaders from 'on-headers'

import { isFunction } from '../../common/utils/is.util'

export interface ResponseTimeOptions {
  digits?: number
  suffix?: boolean
  header?: string
}

export interface ResponseTimeFunction {
  (request: Request, response: Response, time: number): any
}

/**
 * Create function to set response time header.
 */
const createSetHeader = (options: ResponseTimeOptions) => {
  // response time digits
  const digits = options.digits !== undefined ? options.digits : 3

  // header name
  const header = options.header || 'X-Response-Time'

  // display suffix
  const suffix = options.suffix !== undefined ? Boolean(options.suffix) : true

  return function setResponseHeader(
    _req: Request,
    res: Response,
    time: number,
  ) {
    if (res.getHeader(header)) {
      return
    }

    let val = time.toFixed(digits)

    if (suffix) {
      val += 'ms'
    }

    res.setHeader(header, val)
  }
}

/**
 * Add a `x-response-time` header displaying
 * the response duration in milliseconds.
 */
export const responseTime = (
  options: ResponseTimeOptions | ResponseTimeFunction = {},
) => {
  const opts = options || {}

  // get the function to invoke
  const fn = isFunction(opts) ? opts : createSetHeader(opts)

  return (req: Request, res: Response, next: NextFunction) => {
    const startAt = process.hrtime()
    onHeaders(res, () => {
      const diff = process.hrtime(startAt)
      const time = diff[0] * 1e3 + diff[1] * 1e-6
      fn(req, res, time)
    })

    next()
  }
}

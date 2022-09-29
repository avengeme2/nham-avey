import { FallbackProps } from 'react-error-boundary'

import logger from '../utils/logger-utils'

export const ErrorFallback = ({
  error,
  resetErrorBoundary: _,
}: FallbackProps) => {
  logger.error('ErrorFallback', error)
  return <p>Somethings went wrong</p>
}

export default ErrorFallback

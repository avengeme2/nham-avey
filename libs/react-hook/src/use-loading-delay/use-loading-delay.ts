import { useState, useEffect, useRef } from 'react'

interface SpinDelayOptions {
  delay?: number
  minDuration?: number
}

type State = 'IDLE' | 'DELAY' | 'DISPLAY' | 'EXPIRE'

export const defaultOptions = {
  delay: 500,
  minDuration: 200,
}

export const useLoadingDelay = (
  loading: boolean,
  options?: SpinDelayOptions,
): boolean => {
  options = Object.assign({}, defaultOptions, options) as SpinDelayOptions

  const [state, setState] = useState<State>('IDLE')
  const timeout = useRef<number | null>(null)

  useEffect(() => {
    if (loading && state === 'IDLE') {
      clearTimeout(timeout.current as number)

      timeout.current = window.setTimeout(() => {
        if (!loading) {
          return setState('IDLE')
        }

        timeout.current = window.setTimeout(() => {
          setState('EXPIRE')
        }, options?.minDuration)

        setState('DISPLAY')
      }, options?.delay)

      setState('DELAY')
    }

    if (!loading && state !== 'DISPLAY') {
      clearTimeout(timeout.current as number)
      setState('IDLE')
    }
  }, [loading, state, options.delay, options.minDuration])

  useEffect(() => {
    return () => clearTimeout(timeout.current as number)
  }, [])

  return state === 'DISPLAY' || state === 'EXPIRE'
}

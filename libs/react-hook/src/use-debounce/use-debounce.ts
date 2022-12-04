import { useCallback, useRef, useState, Dispatch } from 'react'

import {
  ControlFunctions,
  useDebouncedCallback,
} from '../use-debounced-callback/use-debounced-callback'

const valueEquality = <T>(left: T, right: T): boolean => left === right

const adjustFunctionValueOfSetState = <T>(value: T): T | (() => T) =>
  typeof value === 'function' ? () => value : value

const useStateIgnoreCallback = <T>(initialState: T): [T, Dispatch<T>] => {
  const [state, setState] = useState(
    adjustFunctionValueOfSetState(initialState),
  )
  const setStateIgnoreCallback = useCallback(
    (value: T) => setState(adjustFunctionValueOfSetState(value)),
    [],
  )
  return [state, setStateIgnoreCallback]
}

export const useDebounce = <T>(
  value: T,
  delay: number,
  options?: {
    maxWait?: number
    leading?: boolean
    trailing?: boolean
    equalityFn?: (left: T, right: T) => boolean
  },
): [T, ControlFunctions] => {
  const eq = (options && options.equalityFn) || valueEquality

  const [state, dispatch] = useStateIgnoreCallback(value)
  const debounced = useDebouncedCallback(
    useCallback((value: T) => dispatch(value), [dispatch]),
    delay,
    options,
  )
  const previousValue = useRef(value)

  if (!eq(previousValue.current, value)) {
    debounced(value)
    previousValue.current = value
  }

  return [state, debounced]
}

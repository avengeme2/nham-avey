export const isFunction = (arg: unknown): arg is (...args: any[]) => any => {
  return typeof arg === 'function'
}

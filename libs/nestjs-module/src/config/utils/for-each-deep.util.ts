/**
 * Iterates over elements of collection invoking iteratee for each element.
 * The iteratee is invoked with three arguments: (value, path).
 * path is an array containing keys of current value
 *
 * @param obj object to iterate over
 * @param iteratee The function invoked per iteration.
 */
export function forEachDeep(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iteratee: (value: any, path: string[]) => void,
): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helper = (obj: any, path: string[]) => {
    Object.entries(obj).forEach(([key, value]) => {
      iteratee(value, [...path, key])

      if (typeof value === 'object' && value && !Array.isArray(value)) {
        return helper(value, [...path, key])
      }
    })
  }
  helper(obj, [])
  return
}

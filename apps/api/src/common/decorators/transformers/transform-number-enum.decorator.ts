import { Transform } from 'class-transformer'

export const TransformNumberEnum = (enumType: object) => {
  return Transform(({ value }) => {
    if (typeof value === 'number') {
      return value
    }
    if (Array.isArray(value)) {
      return value.map(v => enumType[v])
    }
    return enumType[value]
  })
}

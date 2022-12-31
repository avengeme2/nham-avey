import { Transform } from 'class-transformer'

export const TransformJson = () => {
  return Transform(({ value }) => JSON.parse(value))
}

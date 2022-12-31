import { Transform } from 'class-transformer'

export const TransformNumber = () => {
  return Transform(({ value }) => +value)
}

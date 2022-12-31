import { Transform } from 'class-transformer'

export const TransformBoolean = () => {
  return Transform(({ value }) => value === 'true' || value === true)
}

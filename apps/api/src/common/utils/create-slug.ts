import slugify from 'slugify'

import { randomId } from './random-id'

export const createSlug = (text: string, addRandomSuffix = false): string => {
  if (addRandomSuffix) {
    text = `${text}-${randomId(3)}`
  }

  return slugify(text, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })
}

import { Restaurant } from './entities/restaurant.entity'

export const RESTAURANT_OPTIONAL_JOIN_COLUMNS: Array<keyof Restaurant> = [
  'coverImages',
  'reviews',
  'categories',
  'vendors',
  'orders',
  'menu',
]

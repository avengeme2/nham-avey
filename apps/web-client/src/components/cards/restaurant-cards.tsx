import { memo } from 'react'

import { Restaurant } from '../../__generated__/grapql.react-query'
import { RestaurantCard } from './restaurant-card'

interface RestaurantCardsProps {
  restaurants: Restaurant[]
}

export const RestaurantCards = ({ restaurants }: RestaurantCardsProps) => {
  return (
    <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {restaurants?.map(restaurant => (
        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  )
}

export const MemoedRestaurantCards = memo(RestaurantCards)

export default RestaurantCards

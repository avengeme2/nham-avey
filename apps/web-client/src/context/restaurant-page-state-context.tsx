import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import {
  Restaurant,
  useRestaurantsQuery,
} from '../__generated__/grapql.react-query'
import { DEFAULT_PAGE_STATE } from '../constants/common-constants'

export interface PageState {
  page: number
  take: number
  q: string
}

interface RestaurantPageState {
  pageState: PageState
  setPageState: Dispatch<SetStateAction<PageState>>
  scrollYPosition: number
  setScrollYPosition: Dispatch<SetStateAction<number>>
  loadedRestaurants: Restaurant[]
  setLoadedRestaurants: Dispatch<SetStateAction<Restaurant[]>>
}

const RestaurantPageStateContext = createContext<RestaurantPageState | null>(
  null,
)

const RestaurantPageStateContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { data: restaurantData } = useRestaurantsQuery(DEFAULT_PAGE_STATE)
  const [pageState, setPageState] = useState(DEFAULT_PAGE_STATE)
  const [loadedRestaurants, setLoadedRestaurants] = useState<Restaurant[]>(
    (restaurantData?.restaurants.data as Restaurant[]) || [],
  )
  const [scrollYPosition, setScrollYPosition] = useState(0)

  return (
    <RestaurantPageStateContext.Provider
      value={{
        pageState,
        setPageState,
        loadedRestaurants,
        setLoadedRestaurants,
        scrollYPosition,
        setScrollYPosition,
      }}
    >
      {children}
    </RestaurantPageStateContext.Provider>
  )
}

export const useRestaurantPageStateContext = () => {
  const context = useContext(RestaurantPageStateContext)
  if (!context) {
    throw new Error(
      'useRestaurantPageStateContext must be used within a RestaurantPageStateContext',
    )
  }
  return context
}

export default RestaurantPageStateContextProvider

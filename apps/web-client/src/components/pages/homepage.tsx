import { useCallback, useEffect } from 'react'

import { NextSeo } from 'next-seo'

import { joinClassName } from '@nham-avey/common'
import {
  ScrollProps,
  useLoadingDelay,
  useScrollPosition,
} from '@nham-avey/react-hook'

import {
  Category,
  Restaurant,
  useCategoriesQuery,
  useRestaurantsQuery,
} from '../../__generated__/grapql.react-query'
import CategoryCard from '../../components/cards/category-card'
import { APP_NAME, DEFAULT_PAGE_STATE } from '../../constants/common-constants'
import { useRestaurantPageStateContext } from '../../context/restaurant-page-state-context'
import { MemoedRestaurantCards as RestaurantCards } from '../cards/restaurant-cards'
import { AuthedLayout } from '../layout/authed-layout'

export const CATEGORIES_VARIABLES = { ...DEFAULT_PAGE_STATE, page: 1, take: 6 } // take only top 6

const HomePage = () => {
  const {
    pageState,
    setPageState,
    loadedRestaurants,
    setLoadedRestaurants,
    setScrollYPosition,
    scrollYPosition,
  } = useRestaurantPageStateContext()

  const {
    data: restaurantData,
    isFetching: isLoadingRestaurant,
    isPreviousData,
  } = useRestaurantsQuery(pageState, { keepPreviousData: true })

  const handleScroll = useCallback(
    ({ currentPosition }: ScrollProps) => setScrollYPosition(currentPosition.y),
    [setScrollYPosition],
  )

  useScrollPosition({ effect: handleScroll, wait: 800 })

  const showLoading = useLoadingDelay(isLoadingRestaurant)

  // update scroll position when navigate back
  useEffect(() => {
    if (isPreviousData || showLoading) return
    if (restaurantData?.restaurants?.hasPrevious) {
      setLoadedRestaurants((prevState: any) => [
        ...prevState,
        ...(restaurantData?.restaurants.data || []),
      ])
      if (window.scrollY === 0) {
        window.scrollBy({ top: -scrollYPosition })
      }
    } else {
      setLoadedRestaurants(
        (restaurantData?.restaurants.data as Restaurant[]) || [],
      )
    }
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState, restaurantData, setLoadedRestaurants, isPreviousData])

  const { data: categoriesData } = useCategoriesQuery(CATEGORIES_VARIABLES)

  // const { register, handleSubmit, getValues } = useForm<FormProps>()
  // const router = useRouter()
  //
  // const onSearchSubmit = () => {
  //   const { searchTerm } = getValues()
  //   router.push({
  //     pathname: "/search",
  //     search: `?term=${searchTerm}`,
  //   })
  // }

  const handleLoadMore = useCallback(() => {
    setPageState(previousState => {
      return {
        ...previousState,
        page: previousState.page + 1,
      }
    })
  }, [setPageState])

  return (
    <AuthedLayout>
      <NextSeo title={APP_NAME} />
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top Categories */}
        <div className="mb-6 mt-12 grid grid-cols-3 gap-8 md:grid-cols-6">
          {categoriesData?.categories?.data?.map(category => (
            <CategoryCard category={category as Category} key={category.id} />
          ))}
        </div>

        <h3 className="h3 mt-12 mb-6">Top Restaurants</h3>
        <RestaurantCards restaurants={loadedRestaurants} />

        {/* Load More button */}
        {restaurantData?.restaurants?.hasNext && (
          <div className="mb-16 text-center">
            <button
              className={joinClassName(
                'w-30 btn-active btn-sm btn h-10 hover:shadow-lg',
                {
                  'loading btn-ghost': showLoading,
                },
              )}
              onClick={handleLoadMore}
            >
              {showLoading ? 'Loading' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </AuthedLayout>
  )
}

export default HomePage

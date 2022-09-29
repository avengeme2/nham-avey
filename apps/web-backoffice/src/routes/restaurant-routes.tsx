import { lazy } from 'react'

import { Navigate, RouteObject } from 'react-router-dom'

const RestaurantsPage = lazy(() => import('../pages/restaurants-page'))
const CategoriesPage = lazy(() => import('../pages/categories-page'))

const restaurantRoute: RouteObject[] = [
  {
    path: '',
    element: <Navigate to="all-restaurants" />,
  },
  {
    path: 'all-restaurants',
    element: <RestaurantsPage />,
  },
  {
    path: 'categories',
    element: <CategoriesPage />,
  },
  {
    path: '*',
    element: <Navigate to="restaurants" />,
  },
]

export default restaurantRoute

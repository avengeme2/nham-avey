import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import userRoutes from '..//routes/user-routes'
import { AppLayout } from '../components/layout/app-layout'
import { APP_PREFIX_PATH } from '../config/app-config'
import restaurantRoute from '../routes/restaurant-routes'

export const USER_PREFIX_PATH = 'users'
export const RESTAURANT_PREFIX_PATH = 'restaurants'

export const defaultAppRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to={APP_PREFIX_PATH} />,
  },
  {
    path: APP_PREFIX_PATH,
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Navigate to={RESTAURANT_PREFIX_PATH} />,
      },
      {
        path: RESTAURANT_PREFIX_PATH,
        element: <Outlet />,
        children: restaurantRoute,
      },
      {
        path: USER_PREFIX_PATH,
        element: <Outlet />,
        children: userRoutes,
      },
    ],
  },
]

export default defaultAppRoutes

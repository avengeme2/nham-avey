import { lazy } from 'react'

import { Navigate, RouteObject } from 'react-router-dom'

const AdminsPage = lazy(() => import('../pages/admins-page'))
const VendorsPage = lazy(() => import('../pages/vendors-page'))
const CustomersPage = lazy(() => import('../pages/customers-page'))
const DriversPage = lazy(() => import('../pages/drivers-page'))

const userRoutes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to="admins" />,
  },
  {
    path: 'admins',
    element: <AdminsPage />,
  },
  {
    path: 'vendors',
    element: <VendorsPage />,
  },
  {
    path: 'customers',
    element: <CustomersPage />,
  },
  {
    path: 'drivers',
    element: <DriversPage />,
  },
  {
    path: '*',
    element: <Navigate to="customers" />,
  },
]

export default userRoutes

import { lazy } from 'react'

import { RouteObject, Navigate } from 'react-router-dom'

import { AuthLayout } from '../components/layout/auth-layout'
import { AUTH_PREFIX_PATH } from '../config/app-config'

const SignInPage = lazy(() => import('../pages/sign-in-page'))

export const authRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to={AUTH_PREFIX_PATH} />,
  },
  {
    path: AUTH_PREFIX_PATH,
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="sign-in" />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: '*',
        element: '404', // TODO
      },
    ],
  },
]

export default authRoutes

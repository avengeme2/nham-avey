import { Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { LoadingIndicator } from '../loading-indicator'

export const AuthLayout = () => {
  return (
    <Suspense fallback={<LoadingIndicator cover="page" size={54} />}>
      <div className="h-screen">
        <Outlet />
      </div>
    </Suspense>
  )
}

export default AuthLayout

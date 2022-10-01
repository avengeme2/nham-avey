import { useMemo } from 'react'

import { useFirebaseAuthState } from '@nham-avey/react-hook'
import { useRoutes } from 'react-router-dom'

import { authRoutes } from '../routes/auth-routes'
import { defaultAppRoutes } from '../routes/default-app-routes'
import firebaseService from '../services/firebase-service'
import _logger from '../utils/logger-utils'
import { LoadingIndicator } from './loading-indicator'

import '../i18n/i18n'

const { auth } = firebaseService
export const App = () => {
  // const onStateChanged = useCallback(async (user: User | null) => {
  //   if (!user) return
  //   const tokenResult = await user.getIdTokenResult()
  //   const { roles } = tokenResult?.claims ?? {}
  //   if (!(Array.isArray(roles) && (roles.includes("STAFF") || roles.includes("ADMIN")))) {
  //     firebaseService.auth.signOut()
  //     // TODO: handling error message
  //   }
  // }, [])
  const { user: firebaseUser, isLoading: isLoadingFirebaseUser } =
    useFirebaseAuthState(auth)

  // const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUserQuery()
  const isLoadingCurrentUser = false

  const authRouter = useRoutes(authRoutes)
  const defaultAppRouter = useRoutes(defaultAppRoutes)

  const isLoading = useMemo(
    () => isLoadingFirebaseUser || isLoadingCurrentUser,
    [isLoadingFirebaseUser, isLoadingCurrentUser],
  )

  if (isLoading) return <LoadingIndicator cover="page" size={54} />

  if (!firebaseUser) return authRouter

  return defaultAppRouter
}

export default App

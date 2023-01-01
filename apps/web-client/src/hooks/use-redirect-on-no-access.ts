import { useEffect } from 'react'

import { Auth } from 'firebase/auth'
import { useRouter } from 'next/router'

import { useFirebaseAuthState } from '@nham-avey/react-hook'

import { UserRole } from '../__generated__/grapql.react-query'

interface UseRedirectOnNoAccess {
  auth: Auth
  redirectUrl: string
  allowedRoles: UserRole[]
}

export const useRedirectByNoAccess = ({
  allowedRoles,
  redirectUrl,
  auth,
}: UseRedirectOnNoAccess) => {
  const { user } = useFirebaseAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      ;(async () => {
        const tokenResult = await user.getIdTokenResult()
        const userRoles = tokenResult.claims.roles as UserRole[]
        const shouldRedirect = !userRoles.some(role =>
          allowedRoles.includes(role),
        )
        if (shouldRedirect) {
          router.replace(redirectUrl)
        }
      })()
    }
  }, [router, redirectUrl, user, allowedRoles])
}

export default useRedirectByNoAccess

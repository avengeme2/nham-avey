import { useState } from 'react'

import { useFirebaseAuthState } from '@nham-avey/react-hook'

import { useMeQuery } from '../../__generated__/grapql.react-query'
import firebaseServices from '../../services/firebase-services'
import { ProfileLinkButton } from '../buttons/profile-link-button'
import { Hamburger } from '../hamburger'
import { LogoLink } from '../links/logo-link'
import { LargeScreenMenu } from '../menu/large-screen-menu'
import { SmallScreenMenu } from '../menu/small-screen-menu'

const { auth } = firebaseServices

export const Header = () => {
  const { user } = useFirebaseAuthState(auth)
  const { data } = useMeQuery({}, { enabled: !!user })
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleMenu = () => setIsExpanded(prevState => !prevState)

  return (
    <header className="border-b-[1px] border-base-300 shadow">
      <div className="subtitle-1 container navbar mx-auto h-20 justify-between bg-base-100 px-4 lg:px-8">
        <div className="navbar-start h-full">
          <LogoLink />
        </div>

        <div className="navbar-end lg:flex">
          <div className="hidden gap-4 md:flex">
            <LargeScreenMenu />
            <ProfileLinkButton />
          </div>
          <button
            className="btn-ghost btn pr-1 hover:bg-transparent md:hidden"
            onClick={handleToggleMenu}
          >
            <Hamburger
              isOpen={isExpanded}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
          </button>
        </div>
      </div>
      <SmallScreenMenu isOpen={isExpanded} isLoggedIn={!!data?.me} />
    </header>
  )
}

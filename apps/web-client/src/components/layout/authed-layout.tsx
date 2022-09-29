import { ReactNode } from 'react'

import { Footer } from './footer'
import { Header } from './header'

interface AuthedLayoutProps {
  children: ReactNode
}

export const AuthedLayout = ({ children }: AuthedLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

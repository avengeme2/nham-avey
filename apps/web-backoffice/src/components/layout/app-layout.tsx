import { CSSProperties, Suspense } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Grid, Layout, Spin } from 'antd'
import { Outlet } from 'react-router-dom'

import {
  HEADER_HEIGHT,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from '../../constants/theme-constants'
import { useTypedSelector } from '../../hooks/redux/use-typed-selector'
import { Footer } from '../footer'
import { HeaderNav } from '../header-nav'
import { MobileNav } from '../mobile-nav'
import { SideNav } from '../side-nav'

const { Content } = Layout
const { useBreakpoint } = Grid

const AppLayoutSuspenseLoader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
    </div>
  )
}

export const AppLayout = () => {
  const breakpoint = useBreakpoint()
  const { navCollapsed } = useTypedSelector(state => state.theme)

  const getLayoutGutter = (): number => {
    if (!breakpoint.lg) return 0
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
  }

  const getLayoutDirectionGutter = (): CSSProperties => {
    return { paddingLeft: getLayoutGutter(), transition: 'all 0.3s ease' }
  }

  return (
    <Layout>
      <HeaderNav />
      <Layout>
        {breakpoint.lg && <SideNav />}
        <Layout
          style={{
            ...getLayoutDirectionGutter(),
          }}
        >
          <div
            className="relative mt-[70px] p-[25px]"
            style={{
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
          >
            <Content className="h-full">
              <Suspense fallback={<AppLayoutSuspenseLoader />}>
                <Outlet />
              </Suspense>
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {!breakpoint.lg && <MobileNav />}
    </Layout>
  )
}

export default AppLayout

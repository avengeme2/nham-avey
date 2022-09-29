import { ArrowLeftOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Link } from 'react-router-dom'

import { useThemeActions } from '../hooks/redux/use-theme-actions'
import { useTypedSelector } from '../hooks/redux/use-typed-selector'
import { Logo } from './logo'
import { MenuContent } from './menu-content'

export const MobileNav = () => {
  const themeState = useTypedSelector(state => state.theme)

  const { mobileNav } = themeState

  const { toggleMobileNav } = useThemeActions()

  const onClose = () => {
    toggleMobileNav(false)
  }

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      visible={mobileNav}
      forceRender
      bodyStyle={{ padding: 5 }}
      width={256}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Link to="/" className="w-[80%]">
            <Logo />
          </Link>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className="cursor-pointer p-2" onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </div>
        <div className="h-[calc(100vh-70px-10px)] w-full">
          <Scrollbars autoHide>
            <MenuContent />
          </Scrollbars>
        </div>
      </div>
    </Drawer>
  )
}

export default MobileNav

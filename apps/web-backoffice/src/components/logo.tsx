import { joinClassName } from '@nham-avey/common'

import { useTypedSelector } from '../hooks/redux/use-typed-selector'

export const Logo = () => {
  const navCollapsed = useTypedSelector(state => state.theme.navCollapsed)

  return (
    <div
      className={joinClassName('text-center font-semibold', {
        'md:2-[250px] w-[200px]': !navCollapsed,
        'w-[80px]': navCollapsed,
      })}
      style={{ transition: 'width .3s ease-in-out' }}
    >
      Nham Avey
    </div>
  )
}

export default Logo

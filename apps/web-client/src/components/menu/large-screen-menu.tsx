import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const LargeScreenMenu = () => {
  return (
    <ul className="menu menu-horizontal p-0">
      <li>
        <Link href="/promotions">Promotions</Link>
      </li>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/no-noninteractive-tabindex */}
      <li tabIndex={0}>
        <a>
          Restaurants
          <ChevronDownIcon className="w-4" />
        </a>
        <ul className="right-0 z-[100] bg-base-100 p-2 shadow-lg">
          <li>
            <Link href="/restaurant/nearby">Nearby</Link>
          </li>
          <li>
            <Link href="/restaurant/our-pick">Our Picks</Link>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default LargeScreenMenu

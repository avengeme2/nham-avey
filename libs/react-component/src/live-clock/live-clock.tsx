import { useState, useEffect, ReactNode, useRef } from 'react'
import Moment from '../react-moment/react-moment'
import 'moment-timezone'

export interface LiveClockProps {
  className?: string
  date?: number | string
  element?: ReactNode
  blinking?: boolean | 'all'
  locale?: string
  format: string
  filter?: (date: string) => string
  style?: object
  interval?: number
  ticking?: boolean
  timezone?: string
  onChange?: (date: number) => void
  onReady?: () => void
  noSsr?: boolean
}

/**
 * @todo remove moment dependencies
 */
export const LiveClock: React.FC<LiveClockProps> = props => {
  const {
    blinking,
    className,
    date,
    element,
    filter,
    format,
    interval,
    locale,
    onChange,
    onReady,
    style,
    ticking,
    timezone,
  } = props

  const startTime = useRef(Date.now())
  const [currentTime, setCurrentTime] = useState(
    date ? new Date(date).getTime() : Date.now(),
  )
  const [formatToUse, setFormatToUse] = useState(format)
  const [noSsr, setNoSsr] = useState(props.noSsr)

  const colonOn = useRef(true)

  function reverseString(str: string) {
    const splitString = str.split('')
    const reverseArray = splitString.reverse()
    const joinArray = reverseArray.join('')

    return joinArray
  }

  useEffect(() => {
    if (noSsr && document) {
      setNoSsr(false)
    }
    if (typeof onReady === 'function') {
      onReady()
    }
  }, [noSsr, onReady])

  useEffect(() => {
    if (ticking || blinking) {
      const tick = setInterval(() => {
        let now = Date.now()

        if (date) {
          const difference = Date.now() - startTime.current

          now = new Date(date).getTime() + difference
        }

        if (blinking) {
          if (colonOn.current) {
            let newFormat = format

            if (blinking === 'all') {
              newFormat = newFormat?.replaceAll(':', ' ')
            } else {
              newFormat = reverseString(format)
              newFormat = newFormat.replace(':', ' ')
              newFormat = reverseString(newFormat)
            }

            colonOn.current = false
            setFormatToUse(newFormat)
          } else {
            setFormatToUse(format)
            colonOn.current = true
          }
        }

        if (ticking) {
          setCurrentTime(now)
        }

        if (typeof onChange === 'function') {
          onChange(now)
        }
      }, interval)

      return () => clearInterval(tick)
    }

    return () => true
  }, [blinking, date, format, interval, onChange, ticking])

  if (noSsr) {
    return null
  }

  return (
    <Moment
      className={className}
      date={ticking ? '' : date}
      element={element}
      filter={filter}
      format={formatToUse}
      locale={locale}
      style={style}
      tz={timezone}
    >
      {currentTime}
    </Moment>
  )
}

LiveClock.defaultProps = {
  element: 'time',
  blinking: false,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  noSsr: false,
}

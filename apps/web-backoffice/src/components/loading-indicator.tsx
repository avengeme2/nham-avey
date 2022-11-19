import { LoadingOutlined } from '@ant-design/icons'
import { joinClassName } from '@nham-avey/common'
import { Spin } from 'antd'

interface LoadingProps {
  align?: 'left' | 'right' | 'center'
  cover?: 'content' | 'page'
  size?: number
}

export const LoadingIndicator = ({ align, cover, size = 35 }: LoadingProps) => {
  return (
    <div
      className={joinClassName('loading', {
        'text-left': align === 'left',
        'text-right': align === 'right',
        'text-center': align === 'center',
        'absolute left-1/2 top-1/2 translate-y-1/2 translate-x-1/2	':
          cover === 'content',
        'fixed flex h-full w-full items-center justify-center':
          cover === 'page',
      })}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
    </div>
  )
}

export default LoadingIndicator

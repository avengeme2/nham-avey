import * as React from 'react'
import { decode } from 'blurhash'

export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  hash: string
  height?: number
  punch?: number
  width?: number
}

export class BlurhashCanvas extends React.PureComponent<Props> {
  static defaultProps = {
    height: 128,
    width: 128,
  }

  canvas: HTMLCanvasElement | null = null

  override componentDidUpdate() {
    this.draw()
  }

  handleRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas
    this.draw()
  }

  draw = () => {
    const { hash, height, punch, width } = this.props

    if (this.canvas) {
      const pixels = decode(hash, width as number, height as number, punch)

      const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
      const imageData = ctx.createImageData(width as number, height as number)
      imageData.data.set(pixels)
      ctx.putImageData(imageData, 0, 0)
    }
  }

  override render() {
    const { hash, height, width, ...rest } = this.props

    return (
      <canvas {...rest} height={height} width={width} ref={this.handleRef} />
    )
  }
}

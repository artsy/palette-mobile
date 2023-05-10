import { FC, PropsWithChildren, useEffect, useRef } from "react"
import { Dimensions } from "react-native"

interface TooltipProps {
  foo: string
}
interface Size {
  width: number
  height: number
}
interface Point {
  x: number
  y: number
}
type Rect = Point & Size

interface TooltipPoints {
  windowDims: Dimensions
  contentSize: Size
  adjustedContentSize: Size
  anchorPoint: Point
  tooltipOrigin: Point
  childRect: Rect
  measurementsFinished: false
}
export const Tooltip: FC<TooltipProps & PropsWithChildren> = ({ children }) => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    Dimensions.get("window")
  })
  return <>{children}</>
}

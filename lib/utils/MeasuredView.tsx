import { useCallback } from "react"
import { ViewStyle, LayoutChangeEvent, useWindowDimensions } from "react-native"
import { Box } from "../atoms"

export interface ViewMeasurements {
  width: number
  height: number
}

interface Props {
  children: React.ReactNode
  setMeasuredState: (measuredState: ViewMeasurements) => void

  /** for debugging, this will render the view where it is, not offscreen. */
  show?: boolean
}

/**
 * A view that renders off-screen, measures the width and height of the view, and reports it back.
 */
export const MeasuredView = ({ children, setMeasuredState, show }: Props) => {
  const offscreenStyle = useOffscreenStyle(show)
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setMeasuredState(event.nativeEvent.layout)
  }, [])

  return (
    <Box style={offscreenStyle} backgroundColor="pink" onLayout={onLayout}>
      {children}
    </Box>
  )
}

export const useOffscreenStyle = (notOffscreen?: boolean): ViewStyle => {
  const { width, height } = useWindowDimensions()

  if (notOffscreen) {
    return {}
  }

  return { position: "absolute", top: width + height, left: width + height }
}

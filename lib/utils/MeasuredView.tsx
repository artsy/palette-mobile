import { useCallback } from "react"
import { Dimensions, ViewStyle, LayoutChangeEvent } from "react-native"
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
export const MeasuredView: React.FC<Props> = ({ children, setMeasuredState, show }) => {
  const offscreenStyle = useOffscreenStyle(show)
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setMeasuredState(event.nativeEvent.layout)
  }, [])

  return (
    <Box {...offscreenStyle} backgroundColor="pink" onLayout={onLayout}>
      {children}
    </Box>
  )
}

export const useOffscreenStyle = (notOffscreen?: boolean): ViewStyle => {
  if (notOffscreen) {
    return {}
  }

  const { width, height } = Dimensions.get("window")
  return { position: "absolute", top: width + height, left: width + height }
}

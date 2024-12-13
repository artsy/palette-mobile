import { useCallback } from "react"
import { ViewStyle, LayoutChangeEvent, useWindowDimensions } from "react-native"
import { isTestEnvironment } from "../../utils/tests/isTestEnvironment"
import { Box } from "../Box"

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
 * Note: it is rendering just null when in test mode.
 */
export const MeasuredView = ({ children, setMeasuredState, show }: Props) => {
  const offscreenStyle = useOffscreenStyle(show)
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setMeasuredState(event.nativeEvent.layout)
  }, [])

  if (isTestEnvironment()) return null

  return (
    <Box
      style={offscreenStyle}
      backgroundColor="pink"
      onLayout={onLayout}
      accessibilityElementsHidden
    >
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

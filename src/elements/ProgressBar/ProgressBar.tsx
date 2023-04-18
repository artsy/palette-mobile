import { useEffect, useState } from "react"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Color } from "../../types"
import { useColor } from "../../utils/hooks/useColor"
import { Flex } from "../Flex"

export interface ProgressBarProps {
  animationDuration?: number
  backgroundColor?: Color
  height?: number
  onCompletion?: () => void
  progress: number
  trackColor?: Color
}

const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max))

export const ProgressBar = ({
  animationDuration = 200,
  backgroundColor = "black30",
  height = 2,
  onCompletion,
  progress: unclampedProgress,
  trackColor = "blue100",
}: ProgressBarProps) => {
  const color = useColor()
  const width = useSharedValue("0%")
  const progress = clamp(unclampedProgress, 0, 100)
  const progressAnim = useAnimatedStyle(() => ({ width: width.value }))

  const [onCompletionCalled, setOnCompletionCalled] = useState(false)

  useEffect(() => {
    width.value = withTiming(`${progress}%`, { duration: animationDuration })

    if (progress === 100 && !onCompletionCalled) {
      onCompletion?.()
      setOnCompletionCalled(true)
    }
  }, [progress])

  return (
    <Flex width="100%" backgroundColor={backgroundColor} my={1}>
      <Animated.View
        testID="progress-bar-track"
        style={[progressAnim, { height, backgroundColor: color(trackColor) }]}
      />
    </Flex>
  )
}

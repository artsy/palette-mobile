import { useEffect } from "react"
import { TouchableWithoutFeedback, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { useColor } from "../../utils/hooks/useColor"
import { Flex } from "../Flex"
import { Text } from "../Text"

interface Props {
  containerStyle?: ViewStyle
  tapToDismiss?: boolean
  height: number
  width: number
  onToolTipPress?: () => void
  onClose: () => void
  position?: "TOP" | "BOTTOM"
  testID?: string
  text?: string
}

export const ToolTipFlyout: React.FC<Props> = ({
  containerStyle,
  tapToDismiss,
  height,
  width,
  onClose,
  onToolTipPress,
  testID,
  text,
}) => {
  const initialBoxDimensions = { height: 0, width: 0 }
  const boxDimensions = useSharedValue(initialBoxDimensions)

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(boxDimensions.get().height, {
        duration: 500,
      }),
      width: withTiming(boxDimensions.get().width, {
        duration: 500,
      }),
    }
  })

  useEffect(() => {
    if (text) {
      boxDimensions.set(() => ({
        height,
        width,
      }))
    } else {
      boxDimensions.set(() => initialBoxDimensions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, height, width])

  const color = useColor()

  const handleClose = () => {
    onClose()
  }

  const onPress = () => {
    onToolTipPress?.()
    if (tapToDismiss) {
      handleClose()
    }
  }

  return (
    <TouchableWithoutFeedback
      accessibilityLabel="Tooltip"
      accessibilityHint="Tap to dismiss"
      onPress={onPress}
      testID={testID}
    >
      <Animated.View
        style={[
          {
            backgroundColor: color("mono100"),
            position: "absolute",
            alignSelf: "center",
            zIndex: 1000,
          },
          containerStyle,
          animationStyle,
        ]}
      >
        <Flex justifyContent="center" alignItems="center" bg="mono100">
          <ToolTipTextContainer text={text} />
        </Flex>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

/** Please be careful with applying any styling here. This forms the basis with which we measure
 * in advance by how large we can inflate a tooltip.
 */
export const ToolTipTextContainer: React.FC<{ text?: string }> = ({ text }) => {
  const color = useColor()
  return (
    <Text variant="xs" color={color("mono0")} pb={0.5}>
      {text}
    </Text>
  )
}

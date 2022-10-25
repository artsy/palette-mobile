import { Children } from "react"
import {
  GestureResponderEvent,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableWithoutFeedback,
} from "react-native"
import Haptic, { HapticFeedbackTypes } from "react-native-haptic-feedback"
import { Flex } from "../../atoms"
import { useColor } from "../../hooks"

interface ExtraTouchableProps {
  flex?: number
  /**
   * `haptic` can be used like:
   * <Touchable haptic />
   * or
   * <Touchable haptic="impactHeavy" />
   */
  haptic?: HapticFeedbackTypes | true
  noFeedback?: boolean
}

export type TouchableProps = TouchableHighlightProps & ExtraTouchableProps

export const Touchable = ({
  children,
  flex,
  haptic,
  noFeedback = false,
  onPress,
  ...restProps
}: TouchableProps) => {
  const color = useColor()
  const inner = Children.count(children) === 1 ? children : <Flex flex={flex}>{children}</Flex>

  const onPressWrapped = (evt: GestureResponderEvent) => {
    if (onPress === undefined) return

    if (haptic !== undefined) {
      Haptic.trigger(haptic === true ? "impactLight" : haptic)
    }

    onPress(evt)
  }

  return noFeedback ? (
    <TouchableWithoutFeedback {...restProps} onPress={onPressWrapped}>
      {inner}
    </TouchableWithoutFeedback>
  ) : (
    <TouchableHighlight
      activeOpacity={0.8}
      {...restProps}
      underlayColor={color("background")}
      onPress={onPressWrapped}
    >
      {inner}
    </TouchableHighlight>
  )
}

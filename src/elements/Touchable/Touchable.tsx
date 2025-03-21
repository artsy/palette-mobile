import React from "react"
import {
  GestureResponderEvent,
  TouchableHighlightProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import Haptic, { HapticFeedbackTypes } from "react-native-haptic-feedback"
import { DEFAULT_ACTIVE_OPACITY } from "../../constants"
import { Color } from "../../types"
import { useColor } from "../../utils/hooks/useColor"
import { Flex } from "../Flex"

interface ExtraTouchableProps {
  flex?: number
  haptic?: HapticFeedbackTypes | true
  noFeedback?: boolean
  underlayColor?: Color
}

export type TouchableProps = TouchableHighlightProps & ExtraTouchableProps

/**
 * `haptic` can be used like:
 * <Touchable haptic />
 * or
 * <Touchable haptic="impactHeavy" />
 */
export const Touchable: React.FC<TouchableProps> = ({
  children,
  flex,
  haptic,
  noFeedback,
  onPress,
  underlayColor,
  ...props
}) => {
  const color = useColor()

  const inner =
    React.Children.count(children) === 1 ? children : <Flex flex={flex}>{children}</Flex>

  const onPressWrapped = (evt: GestureResponderEvent) => {
    if (onPress === undefined) {
      return
    }

    if (haptic !== undefined) {
      Haptic.trigger(haptic === true ? "impactLight" : haptic)
    }

    onPress(evt)
  }

  return noFeedback ? (
    <TouchableWithoutFeedback {...props} onPress={onPressWrapped}>
      {inner}
    </TouchableWithoutFeedback>
  ) : (
    <TouchableOpacity activeOpacity={DEFAULT_ACTIVE_OPACITY} {...props} onPress={onPressWrapped}>
      {inner}
    </TouchableOpacity>
  )
}

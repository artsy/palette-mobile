import * as Haptics from "expo-haptics"
import React from "react"
import {
  GestureResponderEvent,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableWithoutFeedback,
} from "react-native"
import { DEFAULT_ACTIVE_OPACITY } from "../../constants"
import { Color } from "../../types"
import { triggerHaptic } from "../../utils/triggerHaptic"
import { Flex } from "../Flex"

interface ExtraTouchableProps {
  flex?: number
  haptic?: Haptics.NotificationFeedbackType | Haptics.ImpactFeedbackStyle | true
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
  const inner =
    React.Children.count(children) === 1 ? children : <Flex flex={flex}>{children}</Flex>

  const onPressWrapped = (evt: GestureResponderEvent) => {
    if (onPress === undefined) {
      return
    }

    triggerHaptic(haptic)

    onPress(evt)
  }

  return noFeedback ? (
    <TouchableWithoutFeedback {...props} onPress={onPressWrapped}>
      {inner}
    </TouchableWithoutFeedback>
  ) : (
    <TouchableHighlight
      underlayColor={underlayColor ?? "transparent"}
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
      {...props}
      onPress={onPressWrapped}
    >
      {inner}
    </TouchableHighlight>
  )
}

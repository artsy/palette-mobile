import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native"

const ANIMATION_DEFAULTS = {
  stiffness: 600,
  damping: 120,
  useNativeDriver: true,
}

const NOOP = () => {}

export interface TouchableWithScaleProps extends TouchableWithoutFeedbackProps {
  defaultScale?: number
  activeScale?: number
}

export const TouchableWithScale = ({
  defaultScale = 1,
  activeScale = 0.95,
  onPressIn = NOOP,
  onPressOut = NOOP,
  style,
  children,
  ...restProps
}: TouchableWithScaleProps) => {
  const scaleAnimation = new Animated.Value(defaultScale)

  const handlePressIn = (event: GestureResponderEvent) => {
    Animated.spring(scaleAnimation, { ...ANIMATION_DEFAULTS, toValue: activeScale }).start()
    onPressIn(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    Animated.spring(scaleAnimation, { ...ANIMATION_DEFAULTS, toValue: defaultScale }).start()
    onPressOut(event)
  }

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} {...restProps}>
      <Animated.View style={[style, { transform: [{ scale: scaleAnimation }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

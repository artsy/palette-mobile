import { useEffect, useState } from "react"
import { GestureResponderEvent, Pressable, PressableProps } from "react-native"
import Haptic, { HapticFeedbackTypes } from "react-native-haptic-feedback"
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useColorsForVariantAndState } from "./colors"
import { MeasuredView, ViewMeasurements } from "../../elements/MeasuredView"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Spinner } from "../Spinner"
import { Text, useTextStyleForPalette } from "../Text"

const ANIMATION_DURATION = 150

// Color-state indices used with `interpolateColor` below.
const DISABLED = 0
const ACTIVE = 1
const PRESSED = 2

type ButtonSize = "small" | "large"
type ButtonVariant =
  | "fillDark"
  | "fillLight"
  | "fillGray"
  | "fillSuccess"
  | "outline"
  | "outlineGray"
  | "outlineLight"
  | "text"

export interface ButtonProps extends BoxProps {
  children: React.ReactNode

  size?: ButtonSize
  variant?: ButtonVariant
  onPress?: PressableProps["onPress"]

  icon?: React.ReactNode
  iconPosition?: "left" | "left-start" | "right"

  /**
   * `haptic` can be used like:
   * <Button haptic />
   * or
   * <Button haptic="impactHeavy" />
   * to add haptic feedback on the button.
   */
  haptic?: HapticFeedbackTypes | true

  /** Displays a loader in the button */
  loading?: boolean

  /** Disabled interactions */
  disabled?: boolean

  /** Makes button full width */
  block?: boolean

  /** Pass the longest text to the button for the button to keep longest text width */
  longestText?: string

  /** Used only for tests and stories */
  testOnly_pressed?: PressableProps["testOnly_pressed"]
}

export const Button = ({
  children,
  disabled: disabledProp,
  haptic,
  icon,
  iconPosition = "left",
  loading: loadingProp,
  block,
  longestText,
  onPress,
  size = "large",
  variant = "fillDark",
  testOnly_pressed,
  testID,
  hitSlop,
  ...restProps
}: ButtonProps) => {
  const [disabled, _setDisabled, disabledV] = useStateWithProp(!!disabledProp)
  const [loading, _setLoading, _loadingV] = useStateWithProp(!!loadingProp)
  const [pressed, setPressed, pressedV] = useStateWithProp(!!testOnly_pressed)

  // One continuous shared value drives disabled/active/pressed color interpolation (instead of
  // snapping on `disabled` and only animating pressed<->active), so this transition runs entirely
  // on the UI thread and can never desync from another Reanimated animation firing at the same
  // time from a concurrent state update elsewhere on screen.
  const colorState = useSharedValue(disabled ? DISABLED : pressed ? PRESSED : ACTIVE)
  useAnimatedReaction(
    () => (disabledV.value ? DISABLED : pressedV.value ? PRESSED : ACTIVE),
    (target) => {
      colorState.set(() => withTiming(target, { duration: ANIMATION_DURATION }))
    }
  )

  const textStyle = { fontSize: useTextStyleForPalette(size === "small" ? "xs" : "sm").fontSize }

  const [longestTextMeasurements, setLongestTextMeasurements] = useState<ViewMeasurements>({
    width: 0,
    height: 0,
  })

  const height = (() => {
    switch (size) {
      case "small":
        return 30
      case "large":
        return 50
    }
  })()

  const spinnerColor = variant === "text" ? "blue100" : "mono0"

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress === undefined || onPress === null) {
      return
    }

    if (disabled || loading) {
      return
    }

    if (haptic !== undefined) {
      Haptic.trigger(haptic === true ? "impactLight" : haptic)
    }

    onPress(event)
  }

  const colorsForVariantAndState = useColorsForVariantAndState()

  const containerColorsAnim = useAnimatedStyle(() => {
    const colors = colorsForVariantAndState[variant]
    return {
      backgroundColor: interpolateColor(
        colorState.get(),
        [DISABLED, ACTIVE, PRESSED],
        [colors.disabled.bg, colors.active.bg, colors.pressed.bg]
      ),
      borderColor: interpolateColor(
        colorState.get(),
        [DISABLED, ACTIVE, PRESSED],
        [colors.disabled.border, colors.active.border, colors.pressed.border]
      ),
    }
  })

  const textAnim = useAnimatedStyle(() => {
    const colors = colorsForVariantAndState[variant]
    if (loading) {
      return { color: "rgba(0, 0, 0, 0)" }
    }
    return {
      color: interpolateColor(
        colorState.get(),
        [DISABLED, ACTIVE, PRESSED],
        [colors.disabled.text, colors.active.text, colors.pressed.text]
      ),
      textDecorationLine: colorState.get() > PRESSED - 0.5 ? "underline" : "none",
    }
  })

  return (
    <Pressable
      accessibilityLabel={restProps.accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{
        disabled,
      }}
      disabled={disabled}
      onPressIn={() => {
        if (loading) {
          return
        }
        setPressed(true)
      }}
      onPressOut={() => {
        if (loading) {
          return
        }
        setPressed(false)
      }}
      onPress={handlePress}
      testID={testID}
      testOnly_pressed={testOnly_pressed}
      hitSlop={hitSlop}
    >
      <Flex flexDirection="row">
        <Flex
          {...restProps}
          height={height}
          width={block ? "100%" : undefined}
          borderRadius={50}
          overflow="hidden"
        >
          <AFlex borderWidth={1} borderRadius={50} overflow="hidden" style={containerColorsAnim}>
            <Flex
              height="100%"
              mx="25px"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              {iconPosition === "left-start" && !!icon ? (
                <Box position="absolute" left={0}>
                  {icon}
                  <Spacer x={0.5} />
                </Box>
              ) : null}

              {iconPosition === "left" && !!icon ? (
                <>
                  {icon}
                  <Spacer x={0.5} />
                </>
              ) : null}

              <AText
                style={[{ width: Math.ceil(longestTextMeasurements.width) }, textStyle, textAnim]}
                textAlign="center"
              >
                {children}
              </AText>

              <MeasuredView setMeasuredState={setLongestTextMeasurements}>
                <Text color="red" style={textStyle}>
                  {longestText ? longestText : children}
                </Text>
              </MeasuredView>

              {iconPosition === "right" && !!icon ? (
                <>
                  <Spacer x={0.5} />
                  {icon}
                </>
              ) : null}

              {loading ? (
                <Box
                  position="absolute"
                  width="100%"
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner size={size} color={spinnerColor} />
                </Box>
              ) : null}
            </Flex>
          </AFlex>
        </Flex>
      </Flex>
    </Pressable>
  )
}

const AText = Animated.createAnimatedComponent(Text)
const AFlex = Animated.createAnimatedComponent(Flex)

const useStateWithProp = (
  prop: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, Readonly<SharedValue<1 | 0>>] => {
  const [state, setState] = useState(!!prop)
  useEffect(() => {
    setState(!!prop)
  }, [prop])
  const stateV = useDerivedValue(() => {
    if (!!state) {
      return 1
    }
    return 0
  }, [state])

  return [state, setState, stateV]
}

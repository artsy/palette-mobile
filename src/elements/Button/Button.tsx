import { useEffect, useState } from "react"
import { PressableProps, GestureResponderEvent, Pressable } from "react-native"
import Haptic, { HapticFeedbackTypes } from "react-native-haptic-feedback"
import Animated, {
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { Spacer } from "../Spacer"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { MeasuredView, ViewMeasurements } from "../../elements/MeasuredView"
import { Text, useTextStyleForPalette } from "../Text"
import { useColorsForVariantAndState } from "./colors"
import { Spinner } from "../Spinner"

const ANIMATION_DURATION = 150

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
  const [disabled, setDisabled, disabledV] = useStateWithProp(!!disabledProp)
  const [loading, setLoading, loadingV] = useStateWithProp(!!loadingProp)
  const [pressed, setPressed, pressedV] = useStateWithProp(!!testOnly_pressed)

  const pressAnimationProgress = useSharedValue(0)
  useAnimatedReaction(
    () => pressedV.value,
    (pressedVal) => {
      pressAnimationProgress.value = withTiming(pressedVal, { duration: ANIMATION_DURATION })
    }
  )

  const textStyle = useTextStyleForPalette(size === "small" ? "xs" : "sm")
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

  const spinnerColor = variant === "text" ? "blue100" : "white100"

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
    if (disabled) {
      return {
        backgroundColor: colors.disabled.bg,
        borderColor: colors.disabled.border,
      }
    }
    return {
      backgroundColor: interpolateColor(
        pressAnimationProgress.value,
        [0, 1],
        [colors.active.bg, colors.pressed.bg]
      ),
      borderColor: interpolateColor(
        pressAnimationProgress.value,
        [0, 1],
        [colors.active.border, colors.pressed.border]
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
        pressAnimationProgress.value,
        [0, 1],
        [colors.active.text, colors.pressed.text]
      ),
      textDecorationLine: pressAnimationProgress.value > 0 ? "underline" : "none",
    }
  })

  return (
    <Pressable
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
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  Readonly<Animated.SharedValue<1 | 0>>
] => {
  const [state, setState] = useState(!!prop)
  useEffect(() => {
    setState(!!prop)
  }, [prop])
  const stateV = useDerivedValue(() => (!!state ? 1 : 0), [state])

  return [state, setState, stateV]
}

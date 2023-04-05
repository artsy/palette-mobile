import { useState } from "react"
import { PixelRatio, View } from "react-native"
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated"
import { Touchable, TouchableProps } from "../../elements"
import { Color } from "../../types"
import { useColor } from "../../utils/hooks"
import { useTheme } from "../../utils/hooks/useTheme"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

type DisplayState = "unpressed" | "pressed"

export interface CheckboxProps extends FlexProps {
  checked?: boolean
  disabled?: boolean
  error?: boolean
  onPress?: TouchableProps["onPress"]
  text?: React.ReactElement | string
  subtitle?: React.ReactElement | string
}

const CHECKBOX_SIZEx1 = 20
const ANIMATION_DURATION = 250

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: checkedProp,
  disabled = false,
  error = false,
  onPress,
  text,
  subtitle,
  ...flexProps
}) => {
  const { color, space } = useTheme()

  const fontScale = PixelRatio.getFontScale()
  const checkboxSize = CHECKBOX_SIZEx1 * fontScale

  const [checked, setChecked] = useState(checkedProp ?? false)
  const [displayState, setDisplayState] = useState<DisplayState>("unpressed")

  const containerColor: { [key: string]: { border: Color; background: Color } } = {
    unchecked: { border: color("black100"), background: color("white100") },
    error: { border: color("red100"), background: color("white100") },
    checked: { border: color("black100"), background: color("black100") },
    disabled: { border: color("black30"), background: color("black30") },
  }

  const toggleProgress = useDerivedValue(() =>
    withTiming(checked ? 1 : 0, { duration: ANIMATION_DURATION })
  )
  const toggleAnim = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        toggleProgress.value,
        [0, 1],
        [
          containerColor.unchecked.background,
          disabled ? containerColor.disabled.background : containerColor.checked.background,
        ]
      ),
      borderColor: interpolateColor(
        toggleProgress.value,
        [0, 1],
        [
          error
            ? containerColor.error.border
            : disabled
            ? containerColor.disabled.border
            : containerColor.unchecked.border,
          disabled ? containerColor.disabled.border : containerColor.checked.border,
        ]
      ),
    }),
    [toggleProgress]
  )

  const pressedStateProgress = useDerivedValue(() =>
    withTiming(displayState === "pressed" ? 1 : 0, { duration: ANIMATION_DURATION })
  )

  const textColor: Color = color(
    error ? "red100" : disabled ? "onBackgroundLow" : "onBackgroundHigh"
  )
  const pressedTextColor = color("brand")
  const pressAnim = useAnimatedStyle(
    () => ({
      color: interpolateColor(pressedStateProgress.value, [0, 1], [textColor, pressedTextColor]),
    }),
    [pressedStateProgress]
  )

  const subtitleColor: Color = error
    ? "red100"
    : disabled
    ? "onBackgroundLow"
    : "onBackgroundMedium"

  return (
    <Flex {...flexProps}>
      <Touchable
        noFeedback
        disabled={disabled}
        onPressIn={() => setDisplayState("pressed")}
        onPressOut={() => setDisplayState("unpressed")}
        onPress={(event) => {
          if (disabled) return

          setChecked(!checked)
          onPress?.(event)
        }}
      >
        <Flex flex={1}>
          <Flex flexDirection="row">
            <Animated.View
              style={[
                {
                  width: checkboxSize,
                  height: checkboxSize,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                },
                toggleAnim,
              ]}
            >
              {checked && <Checkmark size={checkboxSize} />}
            </Animated.View>

            <Flex ml={1} flex={1}>
              {text !== undefined && (
                <AnimatedText
                  variant="sm-display"
                  color={textColor}
                  numberOfLines={2}
                  underline={displayState === "pressed"}
                  style={pressAnim}
                >
                  {text} {displayState}
                </AnimatedText>
              )}
            </Flex>
          </Flex>

          {subtitle !== undefined && (
            <Flex ml={`${(checkboxSize + space(1)) * fontScale}px`} mt={0.5}>
              <Text variant="xs" color={subtitleColor}>
                {subtitle}
              </Text>
            </Flex>
          )}
        </Flex>
      </Touchable>
    </Flex>
  )
}

const AnimatedText = Animated.createAnimatedComponent(Text)

const Checkmark: React.FC<{ size: number }> = ({ size }) => {
  const color = useColor()

  return (
    <View
      style={{
        width: size * 0.625,
        height: size * 0.3125,
        borderColor: color("white100"),
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        transform: [{ rotate: "-45deg" }],
        top: -2,
      }}
    />
  )
}

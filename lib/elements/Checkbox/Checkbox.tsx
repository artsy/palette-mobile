import { Touchable, TouchableProps } from "../../elements"
import { useState } from "react"
import { PixelRatio, View } from "react-native"
import { Flex } from "../../atoms"
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated"
import { useTheme } from "../../Theme"
import { Text } from "../Text"
import { Color } from "../../tokens"
import { useColor } from "../../hooks"

type DisplayState = "unpressed" | "pressed"

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  error?: boolean
  text?: React.ReactElement | string
  subtitle?: React.ReactElement | string

  onPress?: TouchableProps["onPress"]

  /** Used only for tests and stories */
  testOnly_state?: DisplayState
}

const CHECKBOX_SIZEx1 = 20
const ANIMATION_DURATION = 250

export const Checkbox = ({
  checked: checkedProp,
  disabled,
  error,
  onPress,
  text,
  subtitle,
  testOnly_state,
}: CheckboxProps) => {
  const { color, space } = useTheme()

  const fontScale = PixelRatio.getFontScale()
  const checkboxSize = CHECKBOX_SIZEx1 * fontScale

  const [checked, setChecked] = useState(checkedProp ?? false)
  const [displayState, setDisplayState] = useState<DisplayState>(testOnly_state ?? "unpressed")

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

          <Flex ml="1" flex={1}>
            {!!text && (
              <AText
                variant="sm-display"
                color={textColor}
                numberOfLines={2}
                underline={displayState === "pressed"}
                style={pressAnim}
              >
                {text} {displayState}
              </AText>
            )}
          </Flex>
        </Flex>

        {!!subtitle && (
          <Flex ml={(checkboxSize + space("1")) * fontScale} mt="0.5">
            <Text variant="xs" color={subtitleColor}>
              {subtitle}
            </Text>
          </Flex>
        )}
      </Flex>
    </Touchable>
  )
}

const AText = Animated.createAnimatedComponent(Text)

function Checkmark({ size }: { size: number }) {
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

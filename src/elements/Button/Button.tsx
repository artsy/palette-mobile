import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3" // TODO: remove palette-tokens when this file (Button.tsx) is removed.
import { useState } from "react"
import { PressableProps, TextStyle, GestureResponderEvent, Pressable } from "react-native"
import Haptic, { HapticFeedbackTypes } from "react-native-haptic-feedback"
import { config } from "react-spring"
// @ts-ignore
import { animated, Spring } from "react-spring/renderprops-native"
import styled from "styled-components/native"
import { Color, SpacingUnit } from "../../types"
import { useColor } from "../../utils/hooks"
import { isTestEnvironment } from "../../utils/tests/isTestEnvironment"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex/Flex"
import { MeasuredView, ViewMeasurements } from "../MeasuredView"
import { Spacer } from "../Spacer"
import { Spinner } from "../Spinner"
import { Text } from "../Text/Text"
import { useTextStyleForPalette } from "../Text/helpers"

export interface ButtonProps extends BoxProps {
  children: React.ReactNode

  size?: "small" | "large"
  variant?:
    | "fillDark"
    | "fillLight"
    | "fillGray"
    | "fillSuccess"
    | "outline"
    | "outlineGray"
    | "outlineLight"
    | "text"
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
  testOnly_state?: DisplayState

  textVariant?: TextVariant
}

enum DisplayState {
  Enabled = "enabled",
  Disabled = "disabled",
  Loading = "loading",
  Pressed = "pressed",
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  haptic,
  icon,
  iconPosition = "left",
  loading,
  longestText,
  onPress,
  size = "large",
  variant = "fillDark",
  testOnly_state,
  testID,
  textVariant,
  hitSlop,
  ...rest
}) => {
  const textVariantBySize = size === "small" ? "xs" : "sm"
  const textStyle = useTextStyleForPalette(textVariant ?? textVariantBySize)

  const [innerDisplayState, setInnerDisplayState] = useState(DisplayState.Enabled)

  const [longestTextMeasurements, setLongestTextMeasurements] = useState<ViewMeasurements>({
    width: 0,
    height: 0,
  })

  const displayState =
    testOnly_state ?? // if we use the test prop, use that
    (loading // if we have loading or disabled in props, they are used
      ? DisplayState.Loading
      : disabled
      ? DisplayState.Disabled
      : innerDisplayState) // otherwise use the inner state for pressed or enabled

  const getSize = (): { height: number; mx: SpacingUnit } => {
    switch (size) {
      case "small":
        return { height: 30, mx: "15px" }
      case "large":
        return { height: 50, mx: "30px" }
    }
  }

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress === undefined || onPress === null) {
      return
    }

    if (displayState === DisplayState.Loading || displayState === DisplayState.Disabled) {
      return
    }

    // Did someone tap really fast? Flick the highlighted state
    if (displayState === DisplayState.Enabled) {
      setInnerDisplayState(DisplayState.Pressed)
      setTimeout(() => {
        setInnerDisplayState(DisplayState.Enabled)
      }, 0.3)
    } else {
      // Was already selected
      setInnerDisplayState(DisplayState.Enabled)
    }

    if (haptic !== undefined) {
      Haptic.trigger(haptic === true ? "impactLight" : haptic)
    }

    onPress(event)
  }

  const containerSize = getSize()
  const to = useStyleForVariantAndState(variant, testOnly_state ?? displayState)

  return (
    <Spring native to={to} config={config.stiff}>
      {(springProps: typeof to) => (
        <Pressable
          accessibilityLabel={rest.accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={{
            disabled,
          }}
          hitSlop={hitSlop}
          testOnly_pressed={testOnly_state === DisplayState.Pressed}
          disabled={testOnly_state === DisplayState.Disabled || disabled}
          onPressIn={() => {
            if (displayState === DisplayState.Loading) {
              return
            }
            setInnerDisplayState(DisplayState.Pressed)
          }}
          onPressOut={() => {
            if (displayState === DisplayState.Loading) {
              return
            }
            setInnerDisplayState(DisplayState.Enabled)
          }}
          onPress={handlePress}
          testID={testID}
        >
          <Flex flexDirection="row">
            <AnimatedContainer
              {...rest}
              style={{
                backgroundColor: springProps.backgroundColor,
                borderColor: springProps.borderColor,
                height: containerSize.height,
              }}
            >
              <Flex mx={containerSize.mx}>
                <Flex height="100%" flexDirection="row" alignItems="center" justifyContent="center">
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
                  {/* This makes sure that in testing environment the button text is
                      not rendered twice, in normal environment this is not visible.
                      This will result in us being able to use getByText over
                      getAllByText()[0] to select the buttons in the test environment.
                  */}
                  {!isTestEnvironment() && longestText && (
                    <MeasuredView setMeasuredState={setLongestTextMeasurements}>
                      <Text color="red" style={textStyle}>
                        {longestText ? longestText : children}
                      </Text>
                    </MeasuredView>
                  )}
                  <AnimatedText
                    style={[
                      {
                        width: longestText ? Math.ceil(longestTextMeasurements.width) : "auto",
                        color: springProps.textColor,
                        textDecorationLine: springProps.textDecorationLine,
                      },
                      textStyle,
                    ]}
                    textAlign="center"
                  >
                    {children}
                  </AnimatedText>
                  {iconPosition === "right" && !!icon && (
                    <>
                      <Spacer x={0.5} />
                      {icon}
                    </>
                  )}
                </Flex>

                {displayState === DisplayState.Loading && (
                  <SpinnerContainer>
                    <Spinner size={size} color={to.loaderColor} />
                  </SpinnerContainer>
                )}
              </Flex>
            </AnimatedContainer>
          </Flex>
        </Pressable>
      )}
    </Spring>
  )
}

const useStyleForVariantAndState = (
  variant: Exclude<ButtonProps["variant"], undefined>,
  state: DisplayState
): {
  backgroundColor: string
  borderColor: string
  borderWidth?: number
  textColor: string
  loaderColor: Color
  textDecorationLine?: TextStyle["textDecorationLine"]
} => {
  const color = useColor()

  const retval = {
    textDecorationLine: "none",
  } as ReturnType<typeof useStyleForVariantAndState>

  switch (variant) {
    case "fillDark":
      retval.textColor = color("mono0")
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = color("mono100")
          retval.borderColor = color("mono100")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = color("mono30")
          retval.borderColor = color("mono30")
          // We want to show the text color as white regardless of the theme
          // This makes it easier to read
          retval.textColor = "white"
          break
        case DisplayState.Loading:
          retval.backgroundColor = color("mono100")
          retval.borderColor = color("mono100")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono0"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "fillLight":
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono0")
          retval.textColor = color("mono100")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = color("mono30")
          retval.borderColor = color("mono30")
          retval.textColor = color("mono0")
          break
        case DisplayState.Loading:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono0")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono100"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textColor = color("mono0")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "fillGray":
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = color("mono10")
          retval.borderColor = color("mono10")
          retval.textColor = color("mono100")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = color("mono30")
          retval.borderColor = color("mono30")
          retval.textColor = color("mono0")
          break
        case DisplayState.Loading:
          retval.backgroundColor = color("mono10")
          retval.borderColor = color("mono10")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono100"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textColor = color("mono0")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "fillSuccess":
      retval.textColor = color("mono0")
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          break
        case DisplayState.Loading:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono0"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue10")
          retval.borderColor = color("blue10")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "outline":
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono60")
          retval.textColor = color("mono100")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono30")
          retval.textColor = color("mono30")
          break
        case DisplayState.Loading:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono60")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono100"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textColor = color("mono0")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "outlineGray":
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono30")
          retval.textColor = color("mono100")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono30")
          retval.textColor = color("mono30")
          break
        case DisplayState.Loading:
          retval.backgroundColor = color("background")
          retval.borderColor = color("mono30")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono100"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textColor = color("mono0")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "outlineLight":
      switch (state) {
        case DisplayState.Enabled:
          retval.backgroundColor = "rgba(0, 0, 0, 0)"
          retval.borderColor = color("mono0")
          retval.textColor = color("mono0")
          break
        case DisplayState.Disabled:
          retval.backgroundColor = "rgba(0, 0, 0, 0)"
          retval.borderColor = color("mono30")
          retval.textColor = color("mono30")
          break
        case DisplayState.Loading:
          retval.backgroundColor = "rgba(0, 0, 0, 0)"
          retval.borderColor = color("mono0")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "mono0"
          break
        case DisplayState.Pressed:
          retval.backgroundColor = color("blue100")
          retval.borderColor = color("blue100")
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    case "text":
      retval.backgroundColor = "rgba(0, 0, 0, 0)"
      retval.borderColor = "rgba(0, 0, 0, 0)"
      switch (state) {
        case DisplayState.Enabled:
          retval.textColor = color("mono100")
          break
        case DisplayState.Disabled:
          retval.textColor = color("mono30")
          break
        case DisplayState.Loading:
          retval.textColor = "rgba(0, 0, 0, 0)"
          retval.loaderColor = "blue100"
          break
        case DisplayState.Pressed:
          retval.textColor = color("blue100")
          retval.textDecorationLine = "underline"
          break
        default:
          null
      }
      break

    default:
      null
  }

  return retval
}

const Container = styled(Box)<ButtonProps>`
  position: relative;
  border-width: 1px;
  border-radius: 50px;
  width: ${(p) => (p.block ? "100%" : "auto")};
  overflow: hidden;
`

const SpinnerContainer = styled(Box)<ButtonProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const AnimatedContainer = animated(Container)
const AnimatedText = animated(Text)

export { DisplayState as _test_DisplayState }

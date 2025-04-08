import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { themeGet } from "@styled-system/theme-get"
import {
  Insets,
  PixelRatio,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from "react-native"
import styled from "styled-components/native"
import { CssTransition } from "../../animation"
import { useTheme } from "../../utils/hooks/useTheme"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

const RADIOBUTTON_SIZE = 20
const DURATION = 150

export interface RadioButtonProps
  extends Omit<TouchableWithoutFeedbackProps, "hitSlop">,
    Omit<FlexProps, "hitSlop"> {
  accessibilityState?: { checked: boolean }
  block?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  hitSlop?: Insets
  selected?: boolean
  subtitle?: React.ReactElement | string
  text?: React.ReactElement | string
  textVariant?: TextVariant
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  accessibilityState,
  block,
  disabled,
  error,
  onPress,
  selected,
  subtitle,
  text,
  textVariant = "sm-display",
  ...restProps
}) => {
  const { color, space } = useTheme()

  const fontScale = PixelRatio.getFontScale()
  const radioButtonSize = RADIOBUTTON_SIZE * fontScale

  const defaultRadioButtonStyle = {
    backgroundColor: color("white100"),
    borderColor: color("black30"),
  }

  const selectedRadioButtonStyle = {
    backgroundColor: color("black100"),
    borderColor: color("black100"),
  }

  const disabledRadioButtonStyle = {
    backgroundColor: color("black5"),
    borderColor: color("black10"),
  }

  const radioButtonStyles = {
    default: {
      notSelected: defaultRadioButtonStyle,
      selected: selectedRadioButtonStyle,
    },
    error: {
      notSelected: { backgroundColor: color("white100"), borderColor: color("red100") },
      selected: selectedRadioButtonStyle,
    },
  }

  const radioButtonStyle = disabled
    ? disabledRadioButtonStyle
    : radioButtonStyles[error ? "error" : "default"][selected ? "selected" : "notSelected"]

  const textColor = error ? color("red100") : disabled ? color("black30") : color("black100")
  const subtitleColor = error ? color("red100") : color("black30")

  const AnimatedDot = (
    <Flex mt="2px">
      <CssTransition
        style={[
          styles(fontScale).container,
          { marginRight: space(1) * fontScale },
          radioButtonStyle,
        ]}
        animate={["borderColor"]}
        duration={DURATION}
      >
        {!!selected &&
          (!!disabled ? (
            <DisabledDot size={radioButtonSize} />
          ) : (
            <RadioDot size={radioButtonSize} />
          ))}
      </CssTransition>
    </Flex>
  )

  return (
    <TouchableWithoutFeedback
      accessibilityState={accessibilityState}
      onPress={(event) => {
        if (disabled) {
          return
        }

        onPress?.(event)
      }}
    >
      <Flex {...restProps}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent={block ? "space-between" : "flex-start"}
          width={block ? "100%" : undefined}
        >
          {!block && AnimatedDot}

          <Flex justifyContent="center">
            {!!text && (
              <Text variant={textVariant} color={textColor}>
                {text}
              </Text>
            )}
          </Flex>

          {block && AnimatedDot}
        </Flex>

        <Flex
          ml={block ? 0 : `${(RADIOBUTTON_SIZE + space(1)) * fontScale}px`}
          mt={block ? 0 : 0.5}
        >
          {!!subtitle && (
            <Text variant="xs" color={subtitleColor}>
              {subtitle}
            </Text>
          )}
        </Flex>
      </Flex>
    </TouchableWithoutFeedback>
  )
}

// styled-component does not have support for Animated.View
const styles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderStyle: "solid",
      height: RADIOBUTTON_SIZE * fontScale,
      width: RADIOBUTTON_SIZE * fontScale,
      borderRadius: (RADIOBUTTON_SIZE * fontScale) / 2,
    },
  })

interface RadioDotProps {
  size: number
}

// This component represents the white ● mark in CSS. We are not using styled-system since it's easier to specify raw CSS
// properties with styled-component.
// Height, Width, and Border Radius calculations are used to maintain the size of the white dot when scaling
export const RadioDot = ({ size }: RadioDotProps) => {
  return (
    <View
      style={{
        height: size * 0.625,
        width: size * 0.625,
        borderRadius: size * 0.3125,
        backgroundColor: "white",
      }}
    />
  )
}

export const DisabledDot = styled(RadioDot)`
  border-bottom-color: ${themeGet("colors.black30")};
  border-left-color: ${themeGet("colors.black30")};
`

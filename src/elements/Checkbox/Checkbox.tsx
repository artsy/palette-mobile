import { themeGet } from "@styled-system/theme-get"
import { useState } from "react"
import { Insets, PixelRatio, Pressable, StyleSheet, TouchableOpacityProps } from "react-native"
import styled from "styled-components/native"
import { CssTransition } from "../../animation/CssTransition"
import { useTheme } from "../../utils/hooks/useTheme"
import { Box } from "../Box"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

const CHECKBOX_SIZE = 20
const DURATION = 250

type CheckboxProps = Omit<TouchableOpacityProps, "hitSlop"> &
  Omit<FlexProps, "hitSlop"> & {
    hitSlop?: Insets
    checked?: boolean
    disabled?: boolean
    error?: boolean
    text?: React.ReactElement | string
    subtitle?: React.ReactElement | string
    children?: React.ReactElement | string
    accessibilityLabel?: string
    accessibilityHint?: string
  }

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: checkedProp,
  disabled,
  error,
  onPress,
  text,
  subtitle,
  children,
  accessibilityLabel,
  accessibilityHint,
  ...restProps
}) => {
  const { color, space } = useTheme()

  const fontScale = PixelRatio.getFontScale()
  const checkboxSize = CHECKBOX_SIZE * fontScale

  const [checked, setChecked] = useState(checkedProp)
  const isChecked = checkedProp ?? checked

  const defaultCheckboxStyle = {
    backgroundColor: color("mono0"),
    borderColor: color("mono60"),
  }

  const checkedCheckboxStyle = {
    backgroundColor: color("mono100"),
    borderColor: color("mono100"),
  }

  const disabledCheckboxStyle = {
    backgroundColor: color("mono5"),
    borderColor: color("mono10"),
  }

  const checkboxStyles = {
    default: {
      unchecked: defaultCheckboxStyle,
      checked: checkedCheckboxStyle,
    },
    error: {
      unchecked: { backgroundColor: color("mono0"), borderColor: color("red100") },
      checked: checkedCheckboxStyle,
    },
  }

  const checkboxStyle = disabled
    ? disabledCheckboxStyle
    : checkboxStyles[error ? "error" : "default"][isChecked ? "checked" : "unchecked"]

  const textColor = error ? color("red100") : disabled ? color("mono30") : color("mono100")
  const subtitleColor = error ? color("red100") : disabled ? color("mono30") : color("mono60")

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={(event) => {
        if (disabled) {
          return
        }

        setChecked(!checked)
        onPress?.(event)
      }}
    >
      <Flex flex={1} {...restProps}>
        <Flex flexDirection="row">
          <Flex mt="2px">
            <CssTransition
              style={[
                styles(fontScale).container,
                text || subtitle || children ? { marginRight: space(1) * fontScale } : {},
                checkboxStyle,
              ]}
              animate={["backgroundColor", "borderColor"]}
              duration={DURATION}
            >
              {!!isChecked &&
                (!!disabled ? (
                  <DisabledMark size={checkboxSize} />
                ) : (
                  <CheckMark size={checkboxSize} />
                ))}
            </CssTransition>
          </Flex>

          <Flex justifyContent="center" flex={1}>
            {!!text && (
              <Text variant="sm-display" color={textColor}>
                {text}
              </Text>
            )}
            {children}
          </Flex>
        </Flex>

        {!!subtitle && (
          <Flex ml={`${(CHECKBOX_SIZE + space(1)) * fontScale}px`} mt="6px">
            <Text variant="xs" color={subtitleColor}>
              {subtitle}
            </Text>
          </Flex>
        )}
      </Flex>
    </Pressable>
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
      width: CHECKBOX_SIZE * fontScale,
      height: CHECKBOX_SIZE * fontScale,
    },
  })

interface CheckMarkProps {
  size: number
}

// This component represents the √ mark in CSS. We are not using styled-system since it's easier to specify raw CSS
// properties with styled-component.
export const CheckMark = ({ size }: CheckMarkProps) => (
  <Box
    style={{ transform: [{ rotate: "-45deg" }] }}
    top="-12%"
    width={size * 0.625}
    height={size * 0.3125}
    borderBottomWidth="2px"
    borderBottomColor="mono0"
    borderLeftWidth="2px"
    borderLeftColor="mono0"
  />
)

export const DisabledMark = styled(CheckMark)`
  border-bottom-color: ${themeGet("colors.mono30")};
  border-left-color: ${themeGet("colors.mono30")};
`

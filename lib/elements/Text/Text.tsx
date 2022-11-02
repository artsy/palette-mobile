import { forwardRef, Ref } from "react"
import { StyleProp, TextStyle } from "react-native"
import { Text as RNText, TextProps as RNTextProps } from "react-native"
import styled from "styled-components/native"
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system"
import { useTheme } from "../../Theme"
import { TextVariantV3 } from "../../tokens"
import { useFontFamilyFor } from "./helpers"

export interface TextProps extends RNTextProps, InnerStyledTextProps {
  children?: React.ReactNode
  variant?: TextVariantV3
  italic?: boolean
  caps?: boolean
  weight?: "regular" | "medium"
  maxChars?: number
  underline?: boolean
}

export const Text = forwardRef(
  (
    {
      variant = "sm",
      italic = false,
      color = "onBackgroundHigh",
      caps,
      weight = "regular",
      underline = false,
      style,
      children,
      ...restProps
    }: TextProps,
    ref: Ref<RNText>
  ) => {
    const { theme } = useTheme()
    const fontFamily = useFontFamilyFor({ italic, weight })

    const nativeTextStyle: StyleProp<TextStyle> = [caps ? { textTransform: "uppercase" } : {}]

    return (
      <InnerStyledText
        ref={ref}
        style={[
          ...nativeTextStyle,
          { textAlignVertical: "center" }, // android renders text higher by default, so we bring it down to be consistent with ios
          { textDecorationLine: !!underline ? "underline" : "none" },
          style, // keep last so we can override
        ]}
        fontFamily={fontFamily}
        {...theme.textTreatments[variant]}
        children={children}
        color={color}
        {...restProps}
      />
    )
  }
)

type InnerStyledTextProps = ColorProps & SpaceProps & TypographyProps & FontSizeProps
const InnerStyledText = styled(RNText)<InnerStyledTextProps>`
  ${color}
  ${space}
  ${typography}
  ${fontSize}
`

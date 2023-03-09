import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { forwardRef, Ref } from "react"
import { StyleProp, TextStyle, Text as RNText, TextProps as RNTextProps } from "react-native"
import styled from "styled-components/native"
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  LineHeightProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system"
import { useFontFamilyFor } from "./helpers"
import { useTheme } from "../../utils/hooks/useTheme"
import { TextTreatmentWithoutUnits } from "../../utils/webTokensToMobile"

export interface TextProps extends RNTextProps, InnerStyledTextProps {
  children?: React.ReactNode
  variant?: TextVariant
  italic?: boolean
  caps?: boolean
  weight?: "regular" | "medium"
  maxChars?: number
  underline?: boolean
  maxWidth?: boolean
}

export const Text = forwardRef(
  (
    {
      variant = "sm",
      italic = false,
      color = "onBackgroundHigh",
      caps = false,
      weight = "regular",
      underline = false,
      maxWidth = false,
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
          !!maxWidth ? { width: "100%", maxWidth: 600, alignSelf: "center" } : {},
          style, // keep last so we can override
        ]}
        fontFamily={fontFamily}
        {...fixTextTreatmentForStyledComponent(theme.textTreatments[variant])}
        children={children}
        color={color}
        {...restProps}
      />
    )
  }
)

const fixTextTreatmentForStyledComponent = (treatment: TextTreatmentWithoutUnits) => {
  const treatmentWithUnits = { ...treatment } as any

  if (treatment.lineHeight !== undefined) {
    treatmentWithUnits.lineHeight = `${treatment.lineHeight}px`
  }

  return treatmentWithUnits
}

type LineHeight = `${number}px`
type LineHeightTheme = { lineHeights: Record<LineHeight, any> }

type InnerStyledTextProps = ColorProps &
  SpaceProps &
  TypographyProps &
  LineHeightProps<LineHeightTheme> // even thought it's included in TypographyProps, adding LineHeightProps again so we can specify the type
const InnerStyledText = styled(RNText)<InnerStyledTextProps>`
  ${color}
  ${space}
  ${typography}
`

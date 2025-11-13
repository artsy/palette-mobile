import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { createText } from "@shopify/restyle"
import { forwardRef, Ref } from "react"
import { TextStyle, Text as RNText } from "react-native"
import { useFontFamilyFor } from "./helpers"
import { ThemeType } from "../../tokens"
import { useTheme } from "../../utils/hooks/useTheme"

// Create the base Restyle Text component
const RestyleText = createText<ThemeType>()

// Custom props specific to our Text component
interface CustomTextProps {
  children?: React.ReactNode
  variant?: TextVariant
  italic?: boolean
  caps?: boolean
  weight?: "regular" | "medium"
  maxChars?: number
  underline?: boolean
  /**
   * @deprecated Legacy boolean prop for backward compatibility.
   * When true, centers content with maxWidth 600.
   */
  maxWidth?: boolean
  selectable?: boolean
  color?: keyof ThemeType["colors"]
}

// Combine Restyle props (excluding conflicting ones) with our custom props
export type TextProps = Omit<
  React.ComponentProps<typeof RestyleText>,
  "variant" | "color" | "maxWidth" | keyof CustomTextProps
> &
  CustomTextProps

/**
 * Text component with Restyle theming support and custom styling options.
 *
 * Supports:
 * - Text variants (xs, sm, md, lg, xl, xxl) - themed text styles
 * - Custom props: italic, caps, weight, underline, maxWidth
 * - Spacing: m, p, mt, mr, mb, ml, mx, my, pt, pr, pb, pl, px, py
 * - Typography: fontSize, lineHeight, fontFamily, textAlign, etc.
 * - Colors: color (text color), backgroundColor
 * - Responsive props: e.g., fontSize={{ phone: 14, tablet: 16 }}
 */
export const Text = forwardRef(
  (
    {
      variant = "sm",
      italic = false,
      color = "mono100",
      caps = false,
      weight = "regular",
      underline = false,
      maxWidth = false,
      selectable = true,
      style,
      children,
      ...restProps
    }: TextProps,
    ref: Ref<RNText>
  ) => {
    const { theme } = useTheme()
    const fontFamily = useFontFamilyFor({ italic, weight })

    // Get variant styles from theme
    const variantStyles = theme.textTreatments[variant]

    const baseStyles: TextStyle = {
      fontFamily,
      fontSize: variantStyles.fontSize,
      lineHeight: variantStyles.lineHeight,
      letterSpacing: variantStyles.letterSpacing,
    }

    const transformStyle: TextStyle = caps ? { textTransform: "uppercase" } : {}
    const androidCenterStyle: TextStyle = { textAlignVertical: "center" } // android renders text higher by default
    const underlineStyle: TextStyle = { textDecorationLine: underline ? "underline" : "none" }
    const maxWidthStyle: TextStyle = maxWidth
      ? { width: "100%", maxWidth: 600, alignSelf: "center" }
      : {}

    const nativeTextStyle: TextStyle = {
      ...baseStyles,
      ...transformStyle,
      ...androidCenterStyle,
      ...underlineStyle,
      ...maxWidthStyle,
    }

    return (
      <RestyleText
        ref={ref}
        selectable={selectable}
        style={[nativeTextStyle, style]} // keep style last so we can override
        color={color}
        {...restProps}
      >
        {children}
      </RestyleText>
    )
  }
)

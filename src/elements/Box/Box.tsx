import { SpacingUnit } from "@artsy/palette-tokens"
import {
  createBox,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  border,
  BorderProps,
  backgroundColor,
  BackgroundColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  opacity,
  OpacityProps,
  visible,
  VisibleProps,
  spacingShorthand,
  SpacingShorthandProps,
} from "@shopify/restyle"
import { ComponentProps } from "react"
import { ViewProps } from "react-native"
import { ThemeType } from "../../tokens"

// Create the base Box component using Restyle
const RestyleBox = createBox<ThemeType>()

// Define strict borderRadius values to prevent runtime errors
type BorderRadiusValue =
  | number // allows numeric values like 10 (converted to 10px)
  | `${number}px` // allows string values with px unit like "10px"
  | `${number}rem` // allows rem values like "1rem"
  | `${number}em` // allows em values like "1em"
  | `${number}%` // allows percentage values like "50%"

// Override BorderProps to restrict borderRadius to only valid CSS values
export interface SafeBorderProps
  extends Omit<
    BorderProps<ThemeType>,
    | "borderRadius"
    | "borderTopLeftRadius"
    | "borderTopRightRadius"
    | "borderBottomLeftRadius"
    | "borderBottomRightRadius"
  > {
  borderRadius?: BorderRadiusValue
  borderTopLeftRadius?: BorderRadiusValue
  borderTopRightRadius?: BorderRadiusValue
  borderBottomLeftRadius?: BorderRadiusValue
  borderBottomRightRadius?: BorderRadiusValue
}

// TextAlign props for compatibility
type TextAlignProps = {
  textAlign?: "left" | "center" | "right" | "justify" | "auto"
}

// Combined BoxProps that includes all Restyle props plus custom ones
// Note: gap, rowGap, columnGap are included in SpacingProps from Restyle
export interface BoxProps
  extends ViewProps,
    SpacingProps<ThemeType>,
    SpacingShorthandProps<ThemeType>,
    BackgroundColorProps<ThemeType>,
    LayoutProps<ThemeType>,
    PositionProps<ThemeType>,
    OpacityProps<ThemeType>,
    VisibleProps<ThemeType>,
    Omit<SafeBorderProps, keyof ViewProps>,
    TextAlignProps {}

/**
 * Box is just a `View` with Restyle props for consistent styling.
 *
 * It supports:
 * - Spacing: margin, padding, m, p, mt, mr, mb, ml, mx, my, pt, pr, pb, pl, px, py
 * - Colors: backgroundColor, bg
 * - Layout: width, height, minWidth, minHeight, maxWidth, maxHeight, overflow, flex, flexDirection, etc.
 * - Position: position, top, right, bottom, left, zIndex
 * - Border: borderWidth, borderColor, borderRadius, etc.
 * - Responsive props: e.g., flexDirection={{ phone: 'column', tablet: 'row' }}
 */
export const Box = RestyleBox

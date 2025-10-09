import { SpacingUnit } from "@artsy/palette-tokens"
import { View, ViewProps } from "react-native"
import styled from "styled-components/native"
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  system,
  textAlign,
  TextAlignProps,
} from "styled-system"
import { ColorsTheme, SpacingUnitsTheme } from "../../tokens"

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
    BorderProps,
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

type GapProps = {
  gap?: SpacingUnit
  rowGap?: SpacingUnit
  columnGap?: SpacingUnit
}

const gap = system({
  gap: {
    property: "gap",
    scale: "space",
  },
  rowGap: {
    property: "rowGap",
    scale: "space",
  },
  columnGap: {
    property: "columnGap",
    scale: "space",
  },
})

export interface BoxProps
  extends ViewProps,
    SpaceProps<SpacingUnitsTheme>,
    Omit<ColorProps<ColorsTheme>, "color">,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SafeBorderProps,
    GapProps,
    TextAlignProps {}

/**
 * Box is just a `View` with common styled-system props.
 */
export const Box = styled(View)<BoxProps>`
  ${space}
  ${color}
  ${flexbox}
  ${layout}
  ${position}
  ${border}
  ${textAlign}
  ${gap}
`

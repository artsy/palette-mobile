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
    BorderProps,
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

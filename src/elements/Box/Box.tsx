import { View, ViewProps, ViewStyle } from "react-native"
import { css } from "styled-components"
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
  textAlign,
  TextAlignProps,
} from "styled-system"
import { ColorsTheme, SpacingUnitsTheme } from "../../tokens"

type GapProps = {
  gap?: ViewStyle["gap"]
  rowGap?: ViewStyle["rowGap"]
  columnGap?: ViewStyle["columnGap"]
}

const gap = (props: GapProps) => css`
  gap: ${props.gap};
  column-gap: ${props.columnGap}px;
  row-gap: ${props.rowGap}px;
`

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

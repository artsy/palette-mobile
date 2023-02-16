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
  textAlign,
  TextAlignProps,
} from "styled-system"
import { ColorsTheme, SpacingUnitsTheme } from "../../tokens"

export interface BoxProps
  extends ViewProps,
    SpaceProps<SpacingUnitsTheme>,
    Omit<ColorProps<ColorsTheme>, "color">,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    BorderProps,
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
`

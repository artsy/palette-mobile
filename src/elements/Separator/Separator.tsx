import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components/native"
import { border, BorderProps, space, SpaceProps, width, WidthProps } from "styled-system"

export interface SeparatorProps extends SpaceProps, WidthProps, BorderProps {}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.View.attrs<SeparatorProps>((props) => ({
  width: props.width ?? "100%",
}))<SeparatorProps>`
  border: 1px solid ${themeGet("colors.onBackgroundLow")};
  border-bottom-width: 0;
  ${space};
  ${width};
  ${border};
`

import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components/native"
import { border, BorderProps, space as styledSpace, SpaceProps } from "styled-system"
import { SpacingUnitsTheme } from "../../tokens"
import { Flex, FlexProps } from "../Flex"

export interface BorderBoxProps extends FlexProps, BorderProps, SpaceProps<SpacingUnitsTheme> {
  hover?: boolean
}

/**
 * A `View` or `div` (depending on the platform) that has a common border
 * and padding set by default
 */
export const BorderBox = styled(Flex)<BorderBoxProps>`
  border: 1px solid ${themeGet("colors.mono10")};
  border-radius: 2px;
  padding: ${themeGet("space.2")};
  ${border}
  ${styledSpace}
`

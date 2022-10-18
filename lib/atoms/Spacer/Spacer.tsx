import { HeightProps, SpaceProps, WidthProps } from "styled-system"
import { SpacingUnitV3 } from "../../tokens"
import { Box } from "../Box"

/**
 * @deprecated
 */
export interface OldSpacerProps extends SpaceProps, WidthProps, HeightProps {
  x?: SpaceProps["ml"]
  y?: SpaceProps["mt"]
}

export interface SpacerProps {
  x?: number /* pixels */ | SpacingUnitV3
  y?: number /* pixels */ | SpacingUnitV3

  /**
   * @deprecated Use `x` instead.
   */
  ml?: any
  /**
   * @deprecated Use `x` instead.
   */
  mr?: any
  /**
   * @deprecated Use `y` instead.
   */
  mt?: any
  /**
   * @deprecated Use `y` instead.
   */
  mb?: any
}

/**
 * Used to inject space where it's needed.
 */
export const Spacer = ({ x, y, ...props }: SpacerProps) => (
  <Box ml={x ?? props.ml} mt={y ?? props.mt} {...props} />
)
Spacer.displayName = "Spacer"

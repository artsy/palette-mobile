import { HeightProps, SpaceProps, WidthProps } from "styled-system"
import { Box } from "../../elements/Box"

export interface SpacerProps extends SpaceProps, WidthProps, HeightProps {
  x?: SpaceProps["ml"]
  y?: SpaceProps["mt"]
}

/** Used to inject space where it's needed */
export const Spacer = ({ x, y, ...props }: SpacerProps) => {
  return <Box ml={x ?? props.ml} mt={y ?? props.mt} {...props} />
}

Spacer.displayName = "Spacer"

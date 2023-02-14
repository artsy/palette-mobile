import { SpacingUnit } from "../../tokens"
import { Box } from "../Box"

export interface SpacerProps {
  x?: SpacingUnit
  y?: SpacingUnit
}

/**
 * Used to inject space where it's needed.
 */
export const Spacer = ({ x, y, ...props }: SpacerProps) => <Box ml={x} mt={y} {...props} />

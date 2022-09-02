import { Box, BoxProps } from "../Box"

export type FlexProps = BoxProps

export const Flex = ({ backgroundColor, ...restProps }: FlexProps) => (
  <Box backgroundColor={backgroundColor ?? "transparent"} {...restProps} />
)

Flex.displayName = "Flex"

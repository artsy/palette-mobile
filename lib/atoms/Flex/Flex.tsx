import { forwardRef } from "react"
import { View } from "react-native"
import { Box, BoxProps } from "../Box"

export type FlexProps = BoxProps

export const Flex = forwardRef<View, FlexProps>(({ backgroundColor, ...restProps }, ref) => (
  <Box backgroundColor={backgroundColor ?? "transparent"} {...restProps} ref={ref} />
))

Flex.displayName = "Flex"

import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from "react"
import { Box, BoxProps } from "../Box"
import { type ViewRef } from "../Box/HostView"

export type FlexProps = BoxProps

// Explicitly typed so the emitted .d.ts references ViewRef (see HostView.ts)
export const Flex: ForwardRefExoticComponent<FlexProps & RefAttributes<ViewRef>> = forwardRef<
  ViewRef,
  FlexProps
>(({ backgroundColor, ...restProps }, ref) => (
  <Box backgroundColor={backgroundColor ?? "transparent"} {...restProps} ref={ref} />
))

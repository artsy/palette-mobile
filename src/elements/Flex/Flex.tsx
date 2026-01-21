import { forwardRef } from "react"
import { View } from "react-native"
import { Box, BoxProps } from "../Box"

export type FlexProps = BoxProps

/**
 * Flex is a Box component with display: flex by default (which is the default in React Native).
 * Use this for flex layouts with all the power of Restyle props.
 *
 * Supports all Box props including:
 * - Spacing: m, p, mt, mr, mb, ml, mx, my, pt, pr, pb, pl, px, py
 * - Layout: flexDirection, justifyContent, alignItems, gap, rowGap, columnGap
 * - Responsive props: e.g., flexDirection={{ phone: 'column', tablet: 'row' }}
 */
export const Flex = forwardRef<View, FlexProps>((props, ref) => <Box {...props} ref={ref} />)

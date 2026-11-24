import { type ComponentType, type RefAttributes } from "react"
import { View, type HostInstance, type ViewProps } from "react-native"

/**
 * Ref type for Palette's View-based components (Box, Flex, ...).
 *
 * Under the RN Strict TypeScript API, `View`'s ref type is `ViewInstance`, which the legacy RN types
 * don't export, and tsc inlines `HostInstance` into a deep `react-native/types_generated/...` import
 * when emitting declarations. Declaring our own interface keeps the published .d.ts files referencing
 * only `HostInstance`, which both the strict and legacy RN types export (and which a legacy `View`
 * instance extends), so consumers on either keep working.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ViewRef extends HostInstance {}

/** `View`, typed with a `ViewRef` ref. Same component at runtime. */
export const HostView = View as ComponentType<ViewProps & RefAttributes<ViewRef>>

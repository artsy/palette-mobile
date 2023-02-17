import { ReactNode } from "react"
import { View } from "react-native"

export const Collapse = ({ opened, children }: { opened: boolean; children: ReactNode }) =>
  opened ? <View>{children}</View> : null

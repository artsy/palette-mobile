import { ReactNode } from "react"
import { View } from "react-native"

interface CollapseProps {
  opened: boolean
  children: ReactNode
  /**
   * Prevent the content from being unmounted when it is collapsed (display: none)
   */
  preventUnmount?: boolean
}

export const Collapse: React.FC<CollapseProps> = ({ opened, children, preventUnmount = false }) => {
  if (preventUnmount)
    return <View style={{ display: opened ? undefined : "none" }}>{children}</View>

  return opened ? <View>{children}</View> : null
}

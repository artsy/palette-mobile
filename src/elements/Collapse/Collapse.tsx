import { ReactNode } from "react"
import { View } from "react-native"

export interface CollapseProps {
  opened: boolean
  children: ReactNode
}

export const Collapse: React.FC<CollapseProps> = ({ opened, children }) => {
  if (!opened) {
    return null
  }

  return <View>{children}</View>
}

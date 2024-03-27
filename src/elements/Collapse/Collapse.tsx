import { ReactNode } from "react"
import { View } from "react-native"

interface CollapseProps {
  opened: boolean
  children: ReactNode
}

export const Collapse: React.FC<CollapseProps> = ({ opened, children }) => {
  return <View style={{ display: opened ? undefined : "none" }}>{children}</View>
}

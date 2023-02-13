import { useRef } from "react"
import { View } from "react-native"
import { List } from "../../storybookHelpers"
import { Box, BoxProps } from "../Box"

export default {
  title: "Box",
  component: Box,
}

export const Styled = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Box
      // SpaceProps
      px={1}
      // ColorProps
      backgroundColor="blue100"
      // FlexboxProps
      flexDirection="row"
      // LayoutProps
      height={30}
      // PositionProps
      top={2}
      // BorderProps
      borderBottomWidth={1}
      // TextAlignProps
      textAlign="center"
    />
  </List>
)

export const RegularViewProps = () => {
  const r = useRef<View>(null)
  return (
    <Box
      px={1}
      backgroundColor="red100"
      onLayout={(e) => console.log(e.nativeEvent.layout)}
      ref={r}
    />
  )
}

import { useRef } from "react"
import { View } from "react-native"
import { List } from "../../storybook/storybookHelpers"
import { Box, BoxProps } from "../Box"

export default {
  title: "Box",
  component: Box,
}

export const Styled = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Box
      px={1}
      backgroundColor="blue100"
      flexDirection="row"
      height={30}
      top={2}
      borderBottomWidth={1}
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

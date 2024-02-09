import { useRef } from "react"
import { View } from "react-native"
import { List } from "../../storybook/helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"

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
      height={300}
      width={200}
      top={2}
      borderBottomWidth={1}
      textAlign="center"
    />
  </List>
)

export const RegularViewProps = () => {
  const r = useRef<View>(null)
  return (
    <Flex flex={1}>
      <Box
        px={1}
        height={200}
        width={200}
        backgroundColor="red100"
        onLayout={(e) => console.log(e.nativeEvent.layout)}
        ref={r}
      />
    </Flex>
  )
}

const colors = ["red10", "green10", "yellow10", "devpurple", "red100", "black10"]

export const GapProps = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text>Gap 👇</Text>
    <Box borderWidth={1} borderColor="black100" gap={10} flexWrap="wrap" flexDirection="row">
      {colors.map((color) => (
        <Box key={`${color}-1`} backgroundColor={color} width={100} height={100}>
          <Text>{color}</Text>
        </Box>
      ))}
    </Box>

    <Text>Row gap 👇</Text>
    <Box borderWidth={1} borderColor="black100" rowGap={10} flexWrap="wrap" flexDirection="row">
      {colors.map((color) => (
        <Box key={`${color}-2`} backgroundColor={color} width={100} height={100}>
          <Text>{color}</Text>
        </Box>
      ))}
    </Box>

    <Text>Column gap 👇</Text>
    <Box borderWidth={1} borderColor="black100" columnGap={10} flexWrap="wrap" flexDirection="row">
      {colors.map((color) => (
        <Box key={`${color}-3`} backgroundColor={color} width={100} height={100}>
          <Text>{color}</Text>
        </Box>
      ))}
    </Box>

    <Spacer y={6} />
  </List>
)

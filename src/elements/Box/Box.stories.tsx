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

const colors = ["red10", "green10", "yellow10", "devpurple", "red100", "mono10"]

export const GapProps = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text>Gap 👇</Text>
    <Box borderWidth={1} borderColor="mono100" gap={1} flexWrap="wrap" flexDirection="row">
      {colors.map((color) => (
        <Box key={`${color}-1`} backgroundColor={color} width={100} height={100}>
          <Text>{color}</Text>
        </Box>
      ))}
    </Box>

    <Text>Row gap 👇</Text>
    <Box borderWidth={1} borderColor="mono100" rowGap={1} flexWrap="wrap" flexDirection="row">
      {colors.map((color) => (
        <Box key={`${color}-2`} backgroundColor={color} width={100} height={100}>
          <Text>{color}</Text>
        </Box>
      ))}
    </Box>

    <Text>Column gap 👇</Text>
    <Box borderWidth={1} borderColor="mono100" columnGap={1} flexWrap="wrap" flexDirection="row">
      {colors.map((color) => (
        <Box key={`${color}-3`} backgroundColor={color} width={100} height={100}>
          <Text>{color}</Text>
        </Box>
      ))}
    </Box>

    <Spacer y={6} />
  </List>
)

export const ResponsiveProps = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text variant="lg" weight="medium" mb={2}>
      Responsive Props with Restyle
    </Text>
    <Text variant="sm" color="mono60" mb={4}>
      Resize your device/window to see the responsive behavior
    </Text>

    <Box mb={4}>
      <Text variant="md" weight="medium" mb={1}>
        Responsive flexDirection
      </Text>
      <Text variant="sm" color="mono60" mb={2}>
        Column on phone, row on tablet
      </Text>
      <Box
        borderWidth={1}
        borderColor="mono100"
        p={2}
        flexDirection={{ phone: "column", tablet: "row" }}
        gap={1}
      >
        <Box backgroundColor="blue100" p={2} flex={1}>
          <Text color="mono0">First</Text>
        </Box>
        <Box backgroundColor="red100" p={2} flex={1}>
          <Text color="mono0">Second</Text>
        </Box>
        <Box backgroundColor="green100" p={2} flex={1}>
          <Text color="mono0">Third</Text>
        </Box>
      </Box>
    </Box>

    <Box mb={4}>
      <Text variant="md" weight="medium" mb={1}>
        Responsive padding
      </Text>
      <Text variant="sm" color="mono60" mb={2}>
        Less padding on phone, more on tablet
      </Text>
      <Box
        borderWidth={1}
        borderColor="mono100"
        backgroundColor="devpurple"
        p={{ phone: 1, tablet: 4 }}
      >
        <Text color="mono0">Responsive padding box</Text>
      </Box>
    </Box>

    <Box mb={4}>
      <Text variant="md" weight="medium" mb={1}>
        Responsive width
      </Text>
      <Text variant="sm" color="mono60" mb={2}>
        Full width on phone, 50% on tablet
      </Text>
      <Box
        borderWidth={1}
        borderColor="mono100"
        backgroundColor="brand"
        p={2}
        width={{ phone: "100%", tablet: "50%" }}
      >
        <Text color="mono0">Responsive width</Text>
      </Box>
    </Box>

    <Spacer y={6} />
  </List>
)

export const RestyleFeatures = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text variant="lg" weight="medium" mb={2}>
      Restyle Box Features
    </Text>
    <Text variant="sm" color="mono60" mb={4}>
      Now using @shopify/restyle for consistent theming
    </Text>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Spacing shortcuts
      </Text>
      <Box backgroundColor="blue100" p={2} m={1} borderRadius="8px">
        <Text color="mono0">p=2, m=1</Text>
      </Box>
      <Box backgroundColor="red100" px={2} py={1} mx={1} my={0.5} borderRadius="8px">
        <Text color="mono0">px=2, py=1, mx=1, my=0.5</Text>
      </Box>
    </Box>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Layout props
      </Text>
      <Box flexDirection="row" gap={1}>
        <Box backgroundColor="green100" flex={1} p={2} borderRadius="8px">
          <Text color="mono0">flex=1</Text>
        </Box>
        <Box backgroundColor="yellow100" flex={2} p={2} borderRadius="8px">
          <Text color="mono100">flex=2</Text>
        </Box>
      </Box>
    </Box>

    <Spacer y={6} />
  </List>
)

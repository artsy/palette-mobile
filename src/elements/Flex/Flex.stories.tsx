import { List } from "../../storybook/helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"

export default {
  title: "Flex",
  component: Flex,
}

export const Basic = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text variant="lg" weight="medium" mb={2}>
      Flex Component
    </Text>
    <Text variant="sm" color="mono60" mb={4}>
      Flex is a Box with convenient flex layout defaults
    </Text>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Horizontal layout (default)
      </Text>
      <Flex gap={1}>
        <Box backgroundColor="blue100" p={2} flex={1}>
          <Text color="mono0">Item 1</Text>
        </Box>
        <Box backgroundColor="red100" p={2} flex={1}>
          <Text color="mono0">Item 2</Text>
        </Box>
        <Box backgroundColor="green100" p={2} flex={1}>
          <Text color="mono0">Item 3</Text>
        </Box>
      </Flex>
    </Box>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Vertical layout
      </Text>
      <Flex flexDirection="column" gap={1}>
        <Box backgroundColor="blue100" p={2}>
          <Text color="mono0">Item 1</Text>
        </Box>
        <Box backgroundColor="red100" p={2}>
          <Text color="mono0">Item 2</Text>
        </Box>
        <Box backgroundColor="green100" p={2}>
          <Text color="mono0">Item 3</Text>
        </Box>
      </Flex>
    </Box>

    <Spacer y={6} />
  </List>
)

export const Alignment = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text variant="lg" weight="medium" mb={2}>
      Flex Alignment
    </Text>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        justifyContent
      </Text>
      <Flex justifyContent="space-between" backgroundColor="mono10" p={2} mb={1}>
        <Box backgroundColor="blue100" p={1}>
          <Text color="mono0">A</Text>
        </Box>
        <Box backgroundColor="red100" p={1}>
          <Text color="mono0">B</Text>
        </Box>
        <Box backgroundColor="green100" p={1}>
          <Text color="mono0">C</Text>
        </Box>
      </Flex>

      <Flex justifyContent="center" backgroundColor="mono10" p={2} mb={1}>
        <Box backgroundColor="blue100" p={1}>
          <Text color="mono0">Centered</Text>
        </Box>
      </Flex>

      <Flex justifyContent="flex-end" backgroundColor="mono10" p={2}>
        <Box backgroundColor="blue100" p={1}>
          <Text color="mono0">End</Text>
        </Box>
      </Flex>
    </Box>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        alignItems
      </Text>
      <Flex alignItems="center" backgroundColor="mono10" p={2} height={100} mb={1}>
        <Box backgroundColor="blue100" p={1}>
          <Text color="mono0">Centered vertically</Text>
        </Box>
      </Flex>

      <Flex alignItems="flex-end" backgroundColor="mono10" p={2} height={100}>
        <Box backgroundColor="red100" p={1}>
          <Text color="mono0">At bottom</Text>
        </Box>
      </Flex>
    </Box>

    <Spacer y={6} />
  </List>
)

export const ResponsiveFlex = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text variant="lg" weight="medium" mb={2}>
      Responsive Flex Layouts
    </Text>
    <Text variant="sm" color="mono60" mb={4}>
      Resize your device/window to see the responsive behavior
    </Text>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Column on phone, row on tablet
      </Text>
      <Flex
        flexDirection={{ phone: "column", tablet: "row" }}
        gap={1}
        backgroundColor="mono10"
        p={2}
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
      </Flex>
    </Box>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Responsive gap
      </Text>
      <Flex gap={{ phone: 0.5, tablet: 2 }} backgroundColor="mono10" p={2}>
        <Box backgroundColor="yellow100" p={2}>
          <Text color="mono100">A</Text>
        </Box>
        <Box backgroundColor="yellow100" p={2}>
          <Text color="mono100">B</Text>
        </Box>
        <Box backgroundColor="yellow100" p={2}>
          <Text color="mono100">C</Text>
        </Box>
      </Flex>
    </Box>

    <Box mb={2}>
      <Text variant="md" weight="medium" mb={1}>
        Responsive justifyContent
      </Text>
      <Flex
        justifyContent={{ phone: "flex-start", tablet: "space-between" }}
        backgroundColor="mono10"
        p={2}
      >
        <Box backgroundColor="devpurple" p={2}>
          <Text color="mono0">Start</Text>
        </Box>
        <Box backgroundColor="devpurple" p={2}>
          <Text color="mono0">End</Text>
        </Box>
      </Flex>
    </Box>

    <Spacer y={6} />
  </List>
)

export const NestedFlexLayouts = () => (
  <List style={{ marginHorizontal: 20 }}>
    <Text variant="lg" weight="medium" mb={2}>
      Nested Flex Layouts
    </Text>

    <Flex flexDirection="column" gap={2} backgroundColor="mono10" p={2}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" backgroundColor="blue100" p={2}>
        <Text color="mono0" weight="medium">
          Header
        </Text>
        <Box backgroundColor="mono0" px={2} py={0.5} borderRadius="4px">
          <Text variant="xs" color="blue100">
            Button
          </Text>
        </Box>
      </Flex>

      {/* Content area with sidebar */}
      <Flex gap={2} flex={1}>
        <Box backgroundColor="red100" p={2} flex={3}>
          <Text color="mono0">Main Content (flex: 3)</Text>
        </Box>
        <Box backgroundColor="green100" p={2} flex={1}>
          <Text color="mono0">Sidebar (flex: 1)</Text>
        </Box>
      </Flex>

      {/* Footer */}
      <Flex justifyContent="center" alignItems="center" backgroundColor="yellow100" p={2}>
        <Text color="mono100">Footer</Text>
      </Flex>
    </Flex>

    <Spacer y={6} />
  </List>
)

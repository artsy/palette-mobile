import { storiesOf } from "@storybook/react-native"
import { Tabs } from "./Tabs"
import { Flex } from "../Flex"
import { Text } from "../Text"

storiesOf("Tabs", module)
  .add("Simple Tabs", () => (
    <Flex alignSelf="center" mt="200px" alignItems="center" flexWrap="wrap">
      <Tabs>
        <Tabs.Tab name="Tab 1" label="Tab 1">
          <Tabs.ScrollView>
            <Text>Tab 1 content</Text>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Tab 2" label="Tab 2">
          <Tabs.ScrollView>
            <Text>Tab 2 content</Text>
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs>
    </Flex>
  ))
  .add("Tabs with Indicator", () => (
    <Flex alignSelf="center" mt="200px" flexWrap="wrap">
      <Tabs indicators={[{ tabName: "tab1", Component: () => <Text textAlign="right">hi</Text> }]}>
        <Tabs.Tab name="tab1" label="Tab 1">
          <Tabs.ScrollView>
            <Text>Tab 1 content</Text>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="tab2" label="Tab 2">
          <Tabs.ScrollView>
            <Text>Tab 2 content</Text>
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs>
    </Flex>
  ))

import { storiesOf } from "@storybook/react-native"
import { Tabs } from "./Tabs"
import { Flex } from "../Flex"
import { Screen } from "../Screen"
import { Text } from "../Text"

storiesOf("Tabs", module)
  .add("Simple Tabs", () => (
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
  ))
  .add("Tabs with Indicator", () => (
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
  ))
  .add("Tabs with AnimatedHeader", () => (
    <Screen>
      <Screen.AnimatedHeader title="Title" />
      <Screen.Body fullwidth>
        <Tabs>
          <Tabs.Tab name="tab1" label="Tab 1">
            <Tabs.ScrollView>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text my={1} key={i}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum."
                </Text>
              ))}
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name="tab2" label="Tab 2">
            <Tabs.ScrollView>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text my={1} key={i}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum."
                </Text>
              ))}
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs>
      </Screen.Body>
    </Screen>
  ))
  .add("Tabs with header", () => (
    <Tabs.TabsWithHeader
      title="Artist Header"
      showLargeHeaderText={false}
      BelowTitleHeaderComponent={() => (
        <Flex pointerEvents="none" p={2}>
          <Text>Info</Text>
          <Text>More Info</Text>
        </Flex>
      )}
    >
      <Tabs.Tab name="tab1" label="Tab 1">
        <Tabs.ScrollView>
          <Text>{"Some long text ".repeat(150)}</Text>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="tab2" label="Tab 2">
        <Text>{"Some long text ".repeat(150)}</Text>
      </Tabs.Tab>
    </Tabs.TabsWithHeader>
  ))

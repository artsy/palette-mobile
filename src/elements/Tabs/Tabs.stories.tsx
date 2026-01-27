import { Image } from "react-native"
import { SubTabBar } from "./SubTabBar"
import { Tabs } from "./Tabs"
import { useSpace } from "../../utils/hooks"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Screen } from "../Screen"
import { Text } from "../Text"

export default {
  title: "Tabs",
}

export const SimpleTabs = () => (
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
)

export const TabsWithIndicator = () => (
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
)

TabsWithIndicator.story = {
  name: "Tabs with Indicator",
}

export const TabsWithAnimatedHeader = () => (
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
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum."
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
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum."
              </Text>
            ))}
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs>
    </Screen.Body>
  </Screen>
)

TabsWithAnimatedHeader.story = {
  name: "Tabs with AnimatedHeader",
}

export const TabsWithHeader = () => {
  return (
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
  )
}

TabsWithHeader.story = {
  name: "Tabs with header",
}

export const MasonryTabsWithHeader = () => {
  return (
    <Tabs.TabsWithHeader title="Tabs with Masonry">
      <Tabs.Tab name="tab1" label="Tab 1" SubTabBar={ListHeaderComponent}>
        <Tabs.Masonry
          data={Array.from({ length: 20 })}
          numColumns={2}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          ListHeaderComponentStyle={{
            zIndex: 1000,
          }}
          renderItem={({ index }) => <MasonryArtworkItem index={index} />}
        />
      </Tabs.Tab>
      <Tabs.Tab name="tab2" label="Tab 2">
        <Tabs.FlatList
          contentContainerStyle={{
            paddingHorizontal: 0,
          }}
          data={Array.from({ length: 20 })}
          renderItem={() => <Flex backgroundColor={randomHexColor()} height={80} width="100%" />}
        />
      </Tabs.Tab>
    </Tabs.TabsWithHeader>
  )
}

const ListHeaderComponent: React.FC<{}> = () => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      backgroundColor="mono0"
    >
      <Flex>
        <Text>Create Alert</Text>
      </Flex>
      <Flex>
        <Button>Sory & Filter</Button>
      </Flex>
    </Flex>
  )
}

MasonryTabsWithHeader.story = {
  name: "Masonry Tabs with header",
}

const MasonryArtworkItem = ({ index }: { index: number }) => {
  return (
    <Flex px={1}>
      <Image
        source={{ uri: `https://picsum.photos/id/${index + 100}/200/300` }}
        style={{ width: "100%", height: 200 + Math.random() * 200 }}
        resizeMode="cover"
      />
      <Flex mt={2} mb={2}>
        <Text variant="xs">Artwork {index + 1}</Text>
      </Flex>
    </Flex>
  )
}
const randomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
MasonryTabsWithHeader.story = {
  name: "Masonry Tabs with header",
}

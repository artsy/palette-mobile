import { storiesOf } from "@storybook/react-native"
import { Flex } from "../Flex"
import { Screen } from "../Screen"
import { Text } from "../Text"

storiesOf("Screen", module)
  .add("With Header and BottomView", () => (
    <Screen>
      <Screen.Header title="Title" />
      <Screen.Body scroll>
        {Array.from({ length: 5 }).map((_, i) => (
          <Text my={1} key={i}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
          </Text>
        ))}
      </Screen.Body>
      <Screen.BottomView>
        <Flex backgroundColor="mono30" height={100} width="100%">
          <Text>Footer</Text>
        </Flex>
      </Screen.BottomView>
    </Screen>
  ))
  .add("With Header and Right Element", () => (
    <Screen>
      <Screen.Header
        title="Title"
        rightElements={<Text variant="xs">Very long right element</Text>}
      />
      <Screen.Body scroll>
        {Array.from({ length: 5 }).map((_, i) => (
          <Text my={1} key={i}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
          </Text>
        ))}
      </Screen.Body>
    </Screen>
  ))
  .add("With Header, Without Left Element and Right Element", () => (
    <Screen>
      <Screen.Header
        title="Title"
        hideLeftElements
        rightElements={<Text variant="xs">Very long right element</Text>}
      />
      <Screen.Body scroll>
        {Array.from({ length: 5 }).map((_, i) => (
          <Text my={1} key={i}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
          </Text>
        ))}
      </Screen.Body>
    </Screen>
  ))
  .add("With Right Element & Custom Left Element", () => (
    <Screen>
      <Screen.Header
        title="Title"
        leftElements={<Text variant="xs">Very long left element</Text>}
        rightElements={<Text variant="xs">right element</Text>}
      />
      <Screen.Body scroll>
        {Array.from({ length: 5 }).map((_, i) => (
          <Text my={1} key={i}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
          </Text>
        ))}
      </Screen.Body>
      <Screen.BottomView>
        <Flex backgroundColor="mono30" height={100} width="100%">
          <Text>Footer</Text>
        </Flex>
      </Screen.BottomView>
    </Screen>
  ))
  .add("ScrollView With AnimatedHeader", () => (
    <Screen>
      <Screen.AnimatedHeader title="Title" />

      <Screen.Body>
        <Screen.ScrollView>
          <Text variant="lg-display">Title</Text>

          {Array.from({ length: 5 }).map((_, i) => (
            <Text my={1} key={i}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum."
            </Text>
          ))}
        </Screen.ScrollView>
      </Screen.Body>

      <Screen.BottomView>
        <Flex backgroundColor="mono30" height={100} width="100%">
          <Text>Footer</Text>
        </Flex>
      </Screen.BottomView>
    </Screen>
  ))
  .add("ScrollView With AnimatedHeader and Right Element", () => (
    <Screen>
      <Screen.AnimatedHeader title="Title" rightElements={<Text>Right</Text>} />

      <Screen.Body>
        <Screen.ScrollView>
          <Text variant="lg-display">Title</Text>

          {Array.from({ length: 5 }).map((_, i) => (
            <Text my={1} key={i}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum."
            </Text>
          ))}
        </Screen.ScrollView>
      </Screen.Body>

      <Screen.BottomView>
        <Flex backgroundColor="mono30" height={100} width="100%">
          <Text>Footer</Text>
        </Flex>
      </Screen.BottomView>
    </Screen>
  ))
  .add("FlatList With AnimatedHeader", () => (
    <Screen>
      <Screen.AnimatedHeader title="Title" />

      <Screen.Body>
        <Screen.FlatList
          ListHeaderComponent={() => <Text variant="lg-display">Title</Text>}
          data={Array.from({ length: 50 }).map((_, i) => "Item " + i)}
          renderItem={({ item, index }) => {
            return (
              <Text my={1} key={index}>
                {item}
              </Text>
            )
          }}
        />
      </Screen.Body>

      <Screen.BottomView>
        <Flex backgroundColor="mono30" height={100} width="100%">
          <Text>Footer</Text>
        </Flex>
      </Screen.BottomView>
    </Screen>
  ))

  .add("FlatList With AnimatedHeader and StickySubHeader", () => (
    <Screen>
      <Screen.AnimatedHeader title="Title" />

      <Screen.StickySubHeader title="Title">
        <Flex width="100%" height={60} backgroundColor="red10" />
      </Screen.StickySubHeader>

      <Screen.Body>
        <Screen.FlatList
          data={Array.from({ length: 50 }).map((_, i) => "Item " + i)}
          renderItem={({ item, index }) => {
            return (
              <Text my={1} key={index}>
                {item}
              </Text>
            )
          }}
        />
      </Screen.Body>
    </Screen>
  ))

  .add("FlatList With AnimatedHeader and large StickySubHeader", () => (
    <Screen>
      <Screen.AnimatedHeader title="Title" />

      <Screen.StickySubHeader title="Title" largeTitle>
        <Flex width="100%" height={60} backgroundColor="red10" />
      </Screen.StickySubHeader>

      <Screen.Body>
        <Screen.FlatList
          data={Array.from({ length: 50 }).map((_, i) => "Item " + i)}
          renderItem={({ item, index }) => {
            return (
              <Text my={1} key={index}>
                {item}
              </Text>
            )
          }}
        />
      </Screen.Body>
    </Screen>
  ))

  .add("Fullwidth", () => (
    <Screen>
      <Screen.Header title="Title" />
      <Screen.Body fullwidth>
        <Text>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </Text>
      </Screen.Body>
    </Screen>
  ))

import { ComponentMeta, ComponentStory } from "@storybook/react-native"
import { Screen } from "."
import { Button } from "../../elements/Button"
import { Flex } from "../../elements/Flex"
import { Input } from "../../elements/Input"
import { Text } from "../../elements/Text"

const ScreenMeta: ComponentMeta<typeof Screen> = {
  title: "Screen",
  component: Screen,
  parameters: { noSafeArea: true },
  decorators: [],
}
export default ScreenMeta
type ScreenStory = ComponentStory<typeof Screen>

export const Regular: ScreenStory = () => (
  <Screen>
    <Screen.Body>
      <Text>Hello</Text>
    </Screen.Body>
  </Screen>
)

export const FullBackground: ScreenStory = () => (
  <Screen>
    <Screen.Background>
      <Flex flex={1} backgroundColor="blue" />
    </Screen.Background>
    <Screen.Body>
      <Text>Hello</Text>
    </Screen.Body>
  </Screen>
)

export const FullBackgroundDifferentColors: ScreenStory = () => (
  <Screen>
    <Screen.Background>
      <Flex flex={1} backgroundColor="blue" />
    </Screen.Background>
    <Screen.Body backgroundColor="pink">
      <Text>Hello</Text>
      <Text>
        Make sure to hit the square button at the bottom-right, to see the safe area correctly
      </Text>
    </Screen.Body>
  </Screen>
)

export const FullBackgroundDifferentColorsManual: ScreenStory = () => (
  <Screen>
    <Screen.Background>
      <Flex flex={1} backgroundColor="blue" />
    </Screen.Background>
    <Screen.Body fullwidth>
      <Screen.BodyXPadding flex={1} backgroundColor="orange">
        <Text>Hello</Text>
        <Text>
          Make sure to hit the square button at the bottom-right, to see the safe area correctly
        </Text>
      </Screen.BodyXPadding>
    </Screen.Body>
  </Screen>
)

export const RegularHeader: ScreenStory = () => (
  <Screen>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <Screen.Header onBack={() => {}} />
    <Screen.Body>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </Screen.Body>
  </Screen>
)

export const NoHeader: ScreenStory = () => (
  <Screen>
    <Screen.Body>
      <Text>Hello</Text>
    </Screen.Body>
  </Screen>
)

export const FloatingHeader: ScreenStory = () => (
  <Screen>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <Screen.FloatingHeader onBack={() => {}} />
    <Screen.Body>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </Screen.Body>
  </Screen>
)

export const ScrollScreen: ScreenStory = () => (
  <Screen>
    <Screen.Body scroll>
      <Text>Hello scroll</Text>
      <Text>Hello scroll</Text>
      <Text>Hello scroll</Text>
      <Text>Hello scroll</Text>
      <Text>Hello scroll</Text>
    </Screen.Body>
  </Screen>
)

export const ScrollScreenWithRegularHeader: ScreenStory = () => (
  <Screen>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <Screen.Header onBack={() => {}} />
    <Screen.Body scroll>
      <Text>Hello</Text>
    </Screen.Body>
  </Screen>
)

export const ScrollScreenWithFloatingHeader: ScreenStory = () => (
  <Screen>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <Screen.FloatingHeader onBack={() => {}} />
    <Screen.Body scroll nosafe>
      <Text>Hello scroll with floating</Text>
      <Text>Hello scroll with floating</Text>
      <Text>Hello scroll with floating</Text>
      <Text>Hello scroll with floating</Text>
      <Text>Hello scroll with floating</Text>
    </Screen.Body>
  </Screen>
)

export const ScrollScreenWithBottomView: ScreenStory = () => (
  <Screen>
    <Screen.Body scroll>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>
        Make sure to hit the square button at the bottom-right, to see the safe area correctly
      </Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Input />
      <Screen.BottomView>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <Button onPress={() => {}} block>
          Bottom Action
        </Button>
      </Screen.BottomView>
    </Screen.Body>
  </Screen>
)

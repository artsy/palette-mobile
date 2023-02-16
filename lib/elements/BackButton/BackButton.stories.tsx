import { Flex } from "../Flex"
import { Text } from "../../elements/Text"
import { List } from "../../storybook/helpers"
import { BackButton, BackButtonWithBackground } from "./BackButton"

export default {
  title: "BackButton",
  component: BackButton,
}

export const Styled = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Text>Back button</Text>
    <BackButton />
    <Text>Back button with background</Text>
    <Flex>
      <Flex backgroundColor="red" width={50} height={50} position="absolute" />
      <BackButtonWithBackground />
    </Flex>
  </List>
)

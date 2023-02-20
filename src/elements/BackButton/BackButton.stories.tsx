import { BackButton, BackButtonWithBackground } from "./BackButton"
import { Text } from "../../elements/Text"
import { List } from "../../storybook/helpers"
import { Flex } from "../Flex"

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

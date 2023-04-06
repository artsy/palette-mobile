import { storiesOf } from "@storybook/react-native"
import { List } from "storybook/helpers"
import { VisualClueDot, VisualClueText } from "./"
import { Text } from "../Text"

storiesOf("Theme/Text", module).add("Visual Clue", () => (
  <List>
    <VisualClueDot />
    <>
      <Text>A Feature</Text>
      <VisualClueText style={{ top: 14, right: -24 }} />
    </>
  </List>
))

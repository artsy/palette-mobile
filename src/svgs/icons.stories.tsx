import { List } from "../storybook/helpers"
import { Icon } from "./Icon"
import * as Icons from "."
import { Flex } from "../elements/Flex"
import { Spacer } from "../elements/Spacer"
import { Text } from "../elements/Text"

export default {
  title: "Icons",
  component: Icon,
}

const allIcons = Object.entries(Icons)

export const AllIcons = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    {allIcons.map((icon) => {
      const Comp = icon[1]
      const name = icon[0]
      return (
        <Flex flexDirection="row" alignItems="center">
          <Comp fill="onBackgroundHigh" />
          <Spacer x={1} />
          <Text>{name}</Text>
        </Flex>
      )
    })}
  </List>
)

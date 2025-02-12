import * as Icons from "."
import { Icon } from "./Icon"
import { Flex } from "../elements/Flex"
import { Spacer } from "../elements/Spacer"
import { Text } from "../elements/Text"
import { List } from "../storybook/helpers"

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
          <Comp fill="black100" />
          <Spacer x={1} />
          <Text>{name}</Text>
        </Flex>
      )
    })}
  </List>
)

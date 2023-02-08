import { Text } from "../elements"
import { List } from "../storybookHelpers"
import { Icon } from "./Icon"
import * as Icons from "."
import { Flex, Spacer } from "../atoms"

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

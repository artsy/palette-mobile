import { Text } from "../elements"
import { List } from "../storybookHelpers"
import { Icon } from "./Icon"
import * as Icons from "."
// import * as Icons from "@artsy/icons/allIcons"
import { Flex, Spacer } from "../atoms"

export default {
  title: "Icons",
  component: Icon,
}

const allIcons = Object.entries(Icons)

// start using https://github.com/kristerkari/react-native-svg-transformer instead of rn-svg

export const AllIcons = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 4.00001H12V2.46501C12 2.3324 11.9473 2.20523 11.8536 2.11146C11.7598 2.01769 11.6326 1.96501 11.5 1.96501H6.5C6.36739 1.96501 6.24022 2.01769 6.14645 2.11146C6.05268 2.20523 6 2.3324 6 2.46501V4.00001H3V5.00001H4L5 15.54C5.01008 15.6656 5.06717 15.7827 5.15987 15.868C5.25257 15.9533 5.37404 16.0004 5.5 16H12.5C12.626 16.0004 12.7474 15.9533 12.8401 15.868C12.9328 15.7827 12.9899 15.6656 13 15.54L14 5.00001H15V4.00001ZM7 2.96501H11V4.00001H7V2.96501ZM12 15.04H6L5.05 5.00001H13L12 15.04Z"
        fill="black"
      />
    </svg>

    {allIcons.map((icon) => {
      const Comp = icon[1]
      const name = icon[0]
      return (
        <Flex flexDirection="row" alignItems="center">
          <Comp fill="onBackgroundHigh" />
          <Spacer x="1" />
          <Text>{name}</Text>
        </Flex>
      )
    })}
  </List>
)

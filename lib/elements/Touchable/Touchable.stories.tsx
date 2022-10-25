import { Text } from "../../../dist/elements/Text/Text"
import { Flex } from "../../atoms"
import { List } from "../../storybookHelpers"
import { TrashIcon } from "../../svgs"
import { Touchable } from "./Touchable"

export default {
  title: "Touchable",
  component: Touchable,
}

export const Examples = () => (
  <List>
    <Touchable>
      <Text>This is a text wrapped in a `Touchable`.</Text>
    </Touchable>
    <Touchable>
      <Flex width={200} alignItems="center" borderColor="red" borderWidth={1}>
        <TrashIcon />
        <Text>This is a cell with an icon and a text, wrapped in a `Touchable`.</Text>
      </Flex>
    </Touchable>
  </List>
)

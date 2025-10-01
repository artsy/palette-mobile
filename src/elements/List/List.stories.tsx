import { BulletedItem } from "./BulletedItem"
import { List } from "../../storybook/helpers"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"

export default {
  title: "List",
}

export const _BulletedItem = () => (
  <List>
    <Flex>
      <BulletedItem>Bulleted Item text</BulletedItem>
      <BulletedItem>
        The good thing about Bulleted Item text is that the bullet is aligned separately from the
        rest of the text
      </BulletedItem>
      <Spacer y={2} />
      <Text variant="sm" mx={1} color="mono60">
        • Simple text acting as bulleted item
      </Text>
      <Text variant="sm" mx={1} color="mono60">
        • Simple text acting as bulleted item longer text with a bullet infront of it, just like
        that. and that ain't so pretty, riiiight?!
      </Text>
    </Flex>
  </List>
)

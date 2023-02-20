import { Input } from "./Input"
import { List } from "../../storybook/helpers"
import { MagnifyingGlassIcon } from "../../svgs"
import { Flex } from "../Flex"

export default {
  title: "Input",
  component: Input,
}

export const Styled = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Flex width={300} height={120}>
      <Input />
      <Input placeholder="wow" />
      <Input
        style={{ borderWidth: 0 }}
        icon={<MagnifyingGlassIcon />}
        focusable
        placeholder="Search"
        enableClearButton
      />
    </Flex>
  </List>
)

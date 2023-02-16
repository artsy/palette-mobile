import { MagnifyingGlassIcon } from "../../svgs"
import { Flex } from "../Flex"
import { List } from "../../storybook/storybookHelpers"
import { Input } from "./Input"

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

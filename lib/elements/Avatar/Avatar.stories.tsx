import { List, Row } from "../../storybook/helpers"
import { Avatar, AvatarProps } from "./Avatar"

export default {
  title: "Avatar",
  component: Avatar,
}

const sizes: Array<AvatarProps["size"]> = ["md", "sm", "xs", "xxs"]

export function Variants() {
  return (
    <List>
      <Row>
        {sizes.map((s) => (
          <Avatar key={s} initials="A" size={s} />
        ))}
      </Row>

      <Row>
        {sizes.map((s) => (
          <Avatar key={s} initials="AA" size={s} />
        ))}
      </Row>

      <Row>
        {sizes.map((s) => (
          <Avatar key={s} src="https://placekitten.com/300/300" size={s} />
        ))}
      </Row>
    </List>
  )
}

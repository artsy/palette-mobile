import { Avatar, AvatarProps } from "./Avatar"
import { List, Row } from "../../storybook/helpers"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xxs", "xs", "sm", "md"],
      description: "The size of the Avatar",
    },
    initials: {
      control: { type: "text" },
      description: "If an image is missing, show initials instead",
    },
    src: {
      control: { type: "text" },
      description: "URL of the avatar image",
    },
    blurhash: {
      control: { type: "text" },
      description: "Blurhash string for the image placeholder",
    },
  },
}

export default meta
type AvatarStory = StoryObj<typeof Avatar>

const sizes: Array<AvatarProps["size"]> = ["md", "sm", "xs", "xxs"]

export const Default: AvatarStory = {
  args: {
    initials: "AB",
    size: "md",
  },
  render: (args) => <Avatar {...args} />,
}

export const WithImage: AvatarStory = {
  args: {
    src: "https://placekitten.com/300/300",
    size: "md",
  },
  render: (args) => <Avatar {...args} />,
}

export const WithInitials: AvatarStory = {
  args: {
    initials: "JD",
    size: "md",
  },
  render: (args) => <Avatar {...args} />,
}

export const Variants: AvatarStory = {
  render: () => (
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
  ),
}

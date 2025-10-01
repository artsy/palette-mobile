import { InfoIcon } from "@artsy/icons/native"
import { Text } from "react-native"
import { Message } from "./Message"
import { withTheme } from "../../storybook/decorators"
import { List } from "../../storybook/helpers"
import { Button } from "../Button"

export default {
  title: "Message",
  decorators: [withTheme],
}

export const Variants = () => (
  <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
    <Message variant="default" title="Without Close Button" text="Text" />
    <Message variant="default" title="Without Close Button">
      <Text>Text</Text>
    </Message>
    <Message variant="default" text="Without title" />
    <Message variant="default" showCloseButton title="Title" text="Text" />
    <Message
      variant="default"
      showCloseButton
      title="Title"
      text="Very very very very very very very very very very very very very very long text"
    />
    <Message
      variant="default"
      showCloseButton
      title="Very very very very very very very very very very very very very very long title"
      text="Text"
    />
    <Message
      variant="default"
      showCloseButton
      title="Very very very very very very very very very very very very very very long title"
      text="Very very very very very very very very very very very very very very long text"
    />
  </List>
)

export const ColorVariants = () => (
  <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
    <Message variant="default" showCloseButton title="Default" text="Text" />
    <Message variant="info" showCloseButton title="Info" text="Text" />
    <Message variant="success" showCloseButton title="Success" text="Text" />
    <Message variant="warning" showCloseButton title="Warning" text="Text" />
    <Message variant="error" showCloseButton title="Error" text="Text" />
    <Message variant="dark" showCloseButton title="Error" text="Text" />
  </List>
)

export const IconComponentPosition = () => (
  <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
    <Message
      variant="default"
      showCloseButton
      title="Default position"
      text="Text"
      IconComponent={() => <InfoIcon />}
    />
    <Message
      iconPosition="right"
      variant="default"
      showCloseButton
      title="Rign"
      text="Text"
      IconComponent={() => <Button size="small">Click</Button>}
    />
    <Message
      iconPosition="bottom"
      variant="default"
      showCloseButton
      title="Bottom"
      text="Text"
      IconComponent={() => {
        return <Button size="small">Click</Button>
      }}
    />
    <Message
      iconPosition="bottom"
      variant="dark"
      showCloseButton
      title="Bottom, dark"
      text="Text"
      IconComponent={() => {
        return (
          <Button variant="outlineLight" size="small">
            Click
          </Button>
        )
      }}
    />
  </List>
)

IconComponentPosition.story = {
  name: "IconComponent position",
}

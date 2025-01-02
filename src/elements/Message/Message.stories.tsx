import { storiesOf } from "@storybook/react-native"
import { Text } from "react-native"
import { Message } from "./Message"
import { withTheme } from "../../storybook/decorators"
import { List } from "../../storybook/helpers"
import { InfoCircleIcon } from "../../svgs"
import { Button } from "../Button"

storiesOf("Message", module)
  .addDecorator(withTheme)
  .add("Variants", () => (
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
  ))
  .add("Color Variants", () => (
    <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
      <Message variant="default" showCloseButton title="Default" text="Text" />
      <Message variant="info" showCloseButton title="Info" text="Text" />
      <Message variant="success" showCloseButton title="Success" text="Text" />
      <Message variant="warning" showCloseButton title="Warning" text="Text" />
      <Message variant="error" showCloseButton title="Error" text="Text" />
      <Message variant="dark" showCloseButton title="Error" text="Text" />
    </List>
  ))
  .add("IconComponent position", () => (
    <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
      <Message
        variant="default"
        showCloseButton
        title="Default position"
        text="Text"
        IconComponent={() => <InfoCircleIcon />}
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
            <Button variant="fillLight" size="small">
              Click
            </Button>
          )
        }}
      />
    </List>
  ))

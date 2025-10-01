import { useState } from "react"
import { Dialog, DialogProps } from "."
import { List } from "../../storybook/helpers"
import { Button } from "../Button"

const DialogDemo: React.FC<Omit<DialogProps, "isVisible" | "primaryCta" | "title">> = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <List>
      <Button onPress={() => setVisible(true)}>Show</Button>
      <Dialog
        isVisible={visible}
        title="Dialog Title"
        primaryCta={{
          text: "OK",
          onPress: () => setVisible(false),
        }}
        {...props}
      />
    </List>
  )
}

export default {
  title: "Dialog",
}

export const Default = () => <DialogDemo />

export const WithSecondaryAction = () => (
  <DialogDemo
    secondaryCta={{
      text: "Cancel",
      onPress: () => {},
    }}
  />
)

WithSecondaryAction.story = {
  name: "With secondary action",
}

export const WithDetails = () => (
  <DialogDemo detail="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
)

WithDetails.story = {
  name: "With details",
}

export const WithLongDetails = () => (
  <DialogDemo
    detail={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.".repeat(
      100
    )}
  />
)

WithLongDetails.story = {
  name: "With long details",
}

export const WithBackgroundPressHandler = () => <DialogDemo onBackgroundPress={() => {}} />

WithBackgroundPressHandler.story = {
  name: "With background press handler",
}

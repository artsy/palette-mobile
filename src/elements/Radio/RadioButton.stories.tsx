import { storiesOf } from "@storybook/react-native"
import { useState } from "react"
import { RadioButton } from "./RadioButton"
import { List } from "../../storybook/helpers"
import { Flex } from "../Flex"
import { Text } from "../Text"

export default {
  title: "RadioButton",
  component: RadioButton,
}

storiesOf("RadioButton", module).add("Default", () => {
  const [metric, setMetric] = useState("cm")

  return (
    <List
      contentContainerStyle={{
        marginHorizontal: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Flex flexDirection="row" gap={2}>
        <RadioButton
          onPress={() => {
            setMetric("cm")
          }}
          selected={metric === "cm"}
          text="centimeters"
        />

        <RadioButton
          onPress={() => {
            setMetric("in")
          }}
          selected={metric === "in"}
          text="inches"
        />
      </Flex>

      <Flex>
        <RadioButton
          onPress={() => {
            setMetric("cm")
          }}
          block
          selected={metric === "cm"}
          text="Centimeters"
        />
        <RadioButton
          onPress={() => {
            setMetric("in")
          }}
          block
          selected={metric === "in"}
          text="Inches"
        />
      </Flex>
    </List>
  )
})

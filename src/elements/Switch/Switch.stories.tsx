import { useState } from "react"
import { Switch } from "./Switch"
import { List } from "../../storybook/helpers"
import { Flex } from "../Flex"
import { Text } from "../Text"

export default {
  title: "Switch",
  component: Switch,
}

export const Variants = () => {
  const [switches, setSwitches] = useState([
    { id: 1, label: "Default colors", value: true },
    { id: 2, label: "disabled", value: false },
    { id: 3, label: "Custom #1", value: true },
    { id: 4, label: "Custom #2", value: false },
  ])

  const handleSwitchChange = (id: number) => {
    setSwitches((prevSwitches) =>
      prevSwitches.map((sw) => (sw.id === id ? { ...sw, value: !sw.value } : sw))
    )
  }

  return (
    <List>
      {/* Default state */}
      <Flex width={200} flexDirection="row" justifyContent="space-between">
        <Text>Default State</Text>
        <Switch value={switches[0].value} onValueChange={() => handleSwitchChange(1)} />
      </Flex>

      {/* Disabled state */}
      <Flex width={200} flexDirection="row" justifyContent="space-between">
        <Text>Disabled</Text>
        <Switch disabled value={switches[1].value} onValueChange={() => handleSwitchChange(2)} />
      </Flex>

      {/* Custom Colors #1 */}
      <Flex width={200} flexDirection="row" justifyContent="space-between">
        <Text>Custom Colors 1</Text>
        <Switch
          value={switches[2].value}
          onValueChange={() => handleSwitchChange(3)}
          trackColorActive="red100"
          trackColorInactive="green100"
          thumbColorActive="yellow100"
          thumbColorInactive="orange100"
        />
      </Flex>

      {/* Custom Colors #2 */}
      <Flex width={200} flexDirection="row" justifyContent="space-between">
        <Text>Custom Colors 2</Text>
        <Switch
          value={switches[3].value}
          onValueChange={() => handleSwitchChange(4)}
          thumbColorActive="yellow100"
          trackColorActive="blue100"
          thumbColorInactive="mono0"
          trackColorInactive="red100"
        />
      </Flex>
    </List>
  )
}

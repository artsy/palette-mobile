import { useState } from "react"
import { Collapse } from "./Collapse"
import { LinkText, Text } from "../Text"

export default {
  title: "Collapse",
  component: Collapse,
}

export const Something = () => {
  const [opened, setOpened] = useState(true)
  return (
    <>
      <LinkText onPress={() => setOpened((v) => !v)}>toggle</LinkText>
      <Collapse opened={opened}>
        <Text>inside</Text>
      </Collapse>
    </>
  )
}

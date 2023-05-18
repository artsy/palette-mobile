import { storiesOf } from "@storybook/react-native"
import { useEffect, useRef, useState } from "react"
import { Text } from "react-native"
import { ToolTip } from "./ToolTip"
import { ScreenDimensionsProvider } from "../../../utils/hooks"
import { Button } from "../../Button"
import { Flex } from "../../Flex"

type FlexValue = "center" | "flex-end" | "flex-start"
const FLEX_VALUES: FlexValue[] = ["center", "flex-end", "flex-start"]

storiesOf("ToolTip V2", module).add("Fuck I don't know, man.", () => {
  const aIndex = useRef<number>(0)
  const jIndex = useRef<number>(0)

  const [justification, setJustification] = useState<FlexValue>("center")
  const [alignment, setAlignment] = useState<FlexValue>("center")

  const handlePress = () => {
    aIndex.current = aIndex.current + 1
    jIndex.current = jIndex.current + 1

    setJustification(FLEX_VALUES[aIndex.current])

    if (jIndex.current === 0) {
      setAlignment(FLEX_VALUES[jIndex.current])
    }
  }

  useEffect(() => {
    if (aIndex.current === 2) {
      aIndex.current = -1
    }

    if (jIndex.current === 2) {
      jIndex.current = -1
    }
  }, [justification])

  return (
    <ScreenDimensionsProvider>
      <Flex p={4} pb={6} justifyContent={justification} alignItems={alignment} flex={1}>
        <ToolTip isVisible>
          <Button display="flex">
            <Text onPress={handlePress}>Move</Text>
          </Button>
        </ToolTip>
      </Flex>
    </ScreenDimensionsProvider>
  )
})

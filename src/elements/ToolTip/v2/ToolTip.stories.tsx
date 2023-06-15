import { useState } from "react"
import { Text } from "react-native"
import { ToolTip } from "./ToolTip"
import { ScreenDimensionsProvider } from "../../../utils/hooks"
import { Button } from "../../Button"
import { Flex } from "../../Flex"

export default {
  title: "ToolTip V2",
  component: ToolTip,
}

export const DefaultPlacement = () => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <ScreenDimensionsProvider>
      <Flex flex={1} width="100%" justifyContent="center" backgroundColor="blue10">
        <Flex width="100%" alignItems="center">
          <ToolTip
            isVisible={isVisible}
            content="This is some content. How fancy!"
            title="This is a title"
          >
            <Button display="flex" onPress={() => setIsVisible((prev) => !prev)}>
              <Text>Show</Text>
            </Button>
          </ToolTip>
        </Flex>
      </Flex>
    </ScreenDimensionsProvider>
  )
}

export const TopPlacement = () => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <ScreenDimensionsProvider>
      <Flex flex={1} width="100%" justifyContent="center">
        <Flex width="100%" alignItems="center">
          <ToolTip
            isVisible={isVisible}
            content="This is some content. How fancy!"
            title="This is a title"
            placement="top"
          >
            <Button display="flex" onPress={() => setIsVisible((prev) => !prev)}>
              <Text>Show</Text>
            </Button>
          </ToolTip>
        </Flex>
      </Flex>
    </ScreenDimensionsProvider>
  )
}

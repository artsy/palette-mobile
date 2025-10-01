import { ToolTip, ToolTipContext } from "./ToolTip"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Text } from "../Text"

export default {
  title: "ToolTip",
}

export const SimpleToolTip = () => (
  <Flex alignSelf="center" mt="200px" alignItems="center" flexWrap="wrap">
    <ToolTip initialToolTipText="Tap to dismiss me" position="TOP" tapToDismiss>
      <Text weight="medium">I am a Text</Text>
    </ToolTip>
  </Flex>
)

SimpleToolTip.story = {
  name: "Simple ToolTip",
}

export const BottomToolTip = () => (
  <Flex alignSelf="center" mt="200px" flexWrap="wrap">
    <ToolTip initialToolTipText="Bottom tooltip" position="BOTTOM" tapToDismiss>
      <Text weight="medium">I am a Text</Text>
    </ToolTip>
  </Flex>
)

BottomToolTip.story = {
  name: "Bottom ToolTip",
}

export const ChangeToolTip = () => (
  <Flex alignSelf="center" mt="200px">
    <ToolTip initialToolTipText="I can be changed" position="TOP" tapToDismiss>
      <ToolTipContext.Consumer>
        {({ setToolTip }) => {
          return (
            <Button size="small" onPress={() => setToolTip("I'm the new tooltip")}>
              Press To Change ToolTip
            </Button>
          )
        }}
      </ToolTipContext.Consumer>
    </ToolTip>
  </Flex>
)

ChangeToolTip.story = {
  name: "Change ToolTip",
}

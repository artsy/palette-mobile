import { storiesOf } from "@storybook/react-native"
import { Text } from "react-native"
import { ToolTip } from "./ToolTip"
import { ScreenDimensionsProvider } from "../../../utils/hooks"
import { Button } from "../../Button"
import { Flex } from "../../Flex"

storiesOf("ToolTip V2", module).add("Top placement", () => {
  return (
    <>
      <ScreenDimensionsProvider>
        <Flex flex={1} width="100%" justifyContent="center">
          <Flex width="100%" alignItems="center">
            <ToolTip
              isVisible={true}
              content="This is some content. How fancy!"
              title="This is a title"
            >
              <Button display="flex" m={0}>
                <Text>Show</Text>
              </Button>
            </ToolTip>
          </Flex>
        </Flex>
      </ScreenDimensionsProvider>
    </>
  )
})

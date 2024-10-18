import { useRef } from "react"
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable"
import { Swipeable } from "./"
import { Flex } from "../Flex"
import { Text } from "../Text"

export default {
  title: "Swipeable",
  component: Swipeable,
}

export const Swipable = () => {
  const swipeableRef = useRef<SwipeableMethods>(null)

  return (
    <Flex p={2}>
      <Swipeable
        ref={swipeableRef}
        actionCompoent={<Text color="white100">Close</Text>}
        actionOnPress={() => swipeableRef.current?.close()}
        actionBackground="blue100"
      >
        <Flex p={2} bg="blue10">
          <Text>Hello</Text>
        </Flex>
      </Swipeable>
    </Flex>
  )
}

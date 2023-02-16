import { StyleProp, ViewStyle } from "react-native"
import { Flex } from "../Flex"
import { useColor } from "../../utils/hooks"
import { PopIn } from "../PopIn"
import { Text } from "../Text"

const WRAPPER_WIDTH = 56
const WRAPPER_HEIGHT = 52

export const VisualClueText = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const colors = useColor()

  return (
    <Flex
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
      }}
    >
      <Flex style={{ width: WRAPPER_WIDTH, height: WRAPPER_HEIGHT }}>
        <Flex
          style={[
            {
              position: "absolute",
              top: 14,
              right: -48,
            },
            style,
          ]}
        >
          <PopIn>
            <Text
              style={{
                fontSize: 12,
                color: colors("blue100"),
              }}
            >
              New
            </Text>
          </PopIn>
        </Flex>
      </Flex>
    </Flex>
  )
}

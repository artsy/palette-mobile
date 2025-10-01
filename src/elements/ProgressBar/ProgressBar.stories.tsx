import { ProgressBar } from "./"
import { Flex } from "../Flex"
import { Text } from "../Text"

export default {
  title: "Progress Indicators",
}

export const _ProgressBar = () => (
  <Flex p={2}>
    <Text>10%</Text>
    <ProgressBar progress={10} />
    <Text>20%</Text>
    <ProgressBar progress={20} />
    <Text>50%</Text>
    <ProgressBar progress={50} />
  </Flex>
)

_ProgressBar.story = {
  name: "ProgressBar",
}

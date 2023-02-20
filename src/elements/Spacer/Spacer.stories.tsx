import { Spacer, SpacerProps } from "./Spacer"
import { Text } from "../../elements"
import { List } from "../../storybook/helpers"
import { useSpace } from "../../utils/hooks"
import { bullet } from "../../utils/text"
import { NoUndefined } from "../../utils/types"
import { Box } from "../Box"

export default {
  title: "Spacer",
  component: Spacer,
}

const SpacerRow = (props: { x: NoUndefined<SpacerProps["x"]> }) => {
  const space = useSpace()
  const size = props.x

  return (
    <Box>
      <Box flexDirection="row">
        <Box width={20} height={20} backgroundColor="onBackground" />
        <Spacer {...props} />
        <Box width={20} height={20} backgroundColor="onBackground" />
      </Box>
      <Text color="onBackground">
        {typeof size === "string" ? `${size}` : `${size} ${bullet} ${space(size as any)}px`}
      </Text>
    </Box>
  )
}

export const Horizontal = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Text weight="medium">Defined (units)</Text>
    <SpacerRow x={0.5} />
    <SpacerRow x={1} />
    <SpacerRow x={2} />
    <SpacerRow x={4} />
    <SpacerRow x={6} />
    <SpacerRow x={12} />

    <Text weight="medium">Custom (pixels)</Text>
    <SpacerRow x="15px" />
    <SpacerRow x="50px" />
  </List>
)

const SpacerCol = (props: { y: SpacerProps["y"] }) => {
  const space = useSpace()
  const size = props.y

  return (
    <Box>
      <Box flexDirection="column">
        <Box width={20} height={20} backgroundColor="black" />
        <Spacer {...props} />
        <Box width={20} height={20} backgroundColor="black" />
      </Box>
      <Text color="black">
        {typeof size === "string" ? `${size}` : `${size} ${bullet} ${space(size as any)}px`}
      </Text>
    </Box>
  )
}

export const Vertical = () => (
  <>
    <Text weight="medium">Defined (units)</Text>
    <List
      horizontal
      style={{ marginTop: 50 }}
      contentContainerStyle={{ alignItems: "flex-start", paddingHorizontal: 10 }}
    >
      <SpacerCol y={0.5} />
      <SpacerCol y={1} />
      <SpacerCol y={2} />
      <SpacerCol y={4} />
      <SpacerCol y={6} />
      <SpacerCol y={12} />
    </List>

    <Text weight="medium">Custom (pixels)</Text>
    <List
      horizontal
      style={{ marginTop: 50 }}
      contentContainerStyle={{ alignItems: "flex-start", paddingHorizontal: 10 }}
    >
      <SpacerCol y="15px" />
      <SpacerCol y="50px" />
    </List>
  </>
)

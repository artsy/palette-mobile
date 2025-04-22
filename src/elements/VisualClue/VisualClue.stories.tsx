import { storiesOf } from "@storybook/react-native"
import { VisualClueDot, VisualClueText } from "./"
import { List } from "../../storybook/helpers"
import { Box } from "../Box"
import { Text } from "../Text"

storiesOf("Theme/Text", module).add("Visual Clue", () => (
  <List>
    <Box>
      <Text>Default</Text>
      <Box position="absolute" top="4px" right="-8px">
        <VisualClueDot />
      </Box>
    </Box>

    <Box>
      <Text>Diameter: 4</Text>
      <Box position="absolute" top="4px" right="-4px">
        <VisualClueDot diameter={4} />
      </Box>
    </Box>

    <Box>
      <Text>Diameter: 8</Text>
      <Box position="absolute" top="4px" right="-10px">
        <VisualClueDot diameter={8} />
      </Box>
    </Box>

    <Box>
      <Text>Color: red50</Text>
      <Box position="absolute" top="4px" right="-8px">
        <VisualClueDot color="red50" />
      </Box>
    </Box>

    <Box>
      <Text>Color: red100</Text>
      <Box position="absolute" top="4px" right="-8px">
        <VisualClueDot color="red100" />
      </Box>
    </Box>

    <Box>
      <Text>Color: mono60</Text>
      <Box position="absolute" top="4px" right="-8px">
        <VisualClueDot color="mono60" />
      </Box>
    </Box>

    <>
      <Text>A Feature</Text>
      <VisualClueText style={{ top: 14, right: -24 }} />
    </>
  </List>
))

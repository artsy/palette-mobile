import { StyleSheet } from "react-native"
import { Box, Flex, Spacer } from "../../atoms"
import { ArtsyLogoBlackIcon } from "../../svgs"

interface Props {
  shadow?: boolean
}
export const ArtsyLogoHeader = ({ shadow = false }: Props) => (
  <>
    <Box mt={2} mb={1} style={shadow ? styles.boxShadowStyle : {}}>
      <Flex alignItems="center">
        <ArtsyLogoBlackIcon scale={0.75} />
      </Flex>
      <Spacer x={1} />
    </Box>
    <Spacer x={2} />
  </>
)

const styles = StyleSheet.create({
  boxShadowStyle: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 2.0,
    backgroundColor: "white",
    height: 40,
  },
})

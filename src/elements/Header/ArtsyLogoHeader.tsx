import { ArtsyLogoIcon } from "@artsy/icons/native"
import { StyleSheet } from "react-native"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"

interface Props {
  shadow?: boolean
}
export const ArtsyLogoHeader = ({ shadow = false }: Props) => (
  <>
    <Box mt={2} mb={1} style={shadow ? styles.boxShadowStyle : {}}>
      <Flex alignItems="center">
        <ArtsyLogoIcon height={32} width={94} />
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

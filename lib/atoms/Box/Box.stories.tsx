import { List } from "../../storybookHelpers"
import { Box } from "../Box"

export default {
  title: "Box",
  component: Box,
}

export const Styled = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Box
      // SpaceProps
      px={1}
      // ColorProps
      backgroundColor="blue100"
      // FlexboxProps
      flexDirection="row"
      // LayoutProps
      height={30}
      // PositionProps
      top={2}
      // BorderProps
      borderBottomWidth={1}
      // TextAlignProps
      textAlign="center"
    />
  </List>
)

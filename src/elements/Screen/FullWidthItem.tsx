import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { SpacingUnitDSValue } from "../../types"
import { Flex, FlexProps } from "../Flex"

export const FullWidthItem: React.FC<FlexProps> = (props) => {
  return <Flex {...props} mx={-SCREEN_HORIZONTAL_PADDING as SpacingUnitDSValue} />
}

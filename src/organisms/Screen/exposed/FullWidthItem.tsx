import { SCREEN_HORIZONTAL_PADDING } from "./Body"
import { Flex, FlexProps } from "../../../elements/Flex"
import { SpacingUnitDSValue } from "../../../types"
import { useScreenIsFullWidthBody } from "../atoms"

export const FullWidthItem = (props: FlexProps) => {
  const fullWidthBody = useScreenIsFullWidthBody()

  return (
    <Flex
      {...props}
      mx={fullWidthBody ? undefined : (-SCREEN_HORIZONTAL_PADDING as SpacingUnitDSValue)}
    />
  )
}

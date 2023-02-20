import { FlexProps } from "../../../elements/Flex"
import { Screen } from "../../../elements/Screen"
import { Separator } from "../../../elements/Separator"

export const FullWidthDivider: React.FC<FlexProps> = (flexProps) => {
  return (
    <Screen.FullWidthItem>
      <Separator my={2} {...flexProps} />
    </Screen.FullWidthItem>
  )
}

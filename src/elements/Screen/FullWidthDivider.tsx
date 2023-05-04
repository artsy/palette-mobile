import { FlexProps } from "../Flex"
import { Screen } from "../Screen"
import { Separator } from "../Separator"

export const FullWidthDivider: React.FC<FlexProps> = (flexProps) => {
  return (
    <Screen.FullWidthItem>
      <Separator my={2} {...flexProps} />
    </Screen.FullWidthItem>
  )
}

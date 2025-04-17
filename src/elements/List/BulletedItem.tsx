import { bullet } from "../../utils/text"
import { Flex, FlexProps } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"

interface BulletedItemProps extends FlexProps {
  children: React.ReactNode
  color?: string
}

export const BulletedItem = ({
  children,
  color = "mono60",
  ...otherFlexProps
}: BulletedItemProps) => {
  return (
    <Flex flexDirection="row" px={1} {...otherFlexProps}>
      <Text variant="sm" color={color}>
        {bullet}
      </Text>
      <Spacer x={1} />
      <Text variant="sm" color={color}>
        {children}
      </Text>
    </Flex>
  )
}

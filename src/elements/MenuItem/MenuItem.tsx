import { ChevronRightIcon } from "@artsy/icons/native"
import { useColor } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

export interface MenuItemProps {
  disabled?: boolean
  title: React.ReactNode
  value?: React.ReactNode
  text?: string
  onPress?: () => void
  chevron?: React.ReactNode
  rightView?: React.ReactNode
}

export const MenuItem = ({
  title,
  text,
  value,
  onPress,
  disabled = false,
  chevron = <ChevronRightIcon fill="black60" />,
}: MenuItemProps) => {
  const color = useColor()

  return (
    <Touchable onPress={onPress} underlayColor={color("black5")} disabled={disabled}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        py={2}
        px={2}
        pr="15px"
      >
        <Flex flexDirection="row" mr={2}>
          <Text variant="md" color="onBackgroundHigh">
            {title}
          </Text>
        </Flex>
        {!!value && (
          <Flex flex={1}>
            <Text variant="md" color="black60" numberOfLines={1} textAlign="right">
              {value}
            </Text>
          </Flex>
        )}
        {!!(onPress && chevron) && <Flex ml={1}>{chevron}</Flex>}

        {!!text && (
          <Text variant="md" color={color("black60")}>
            {text}
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

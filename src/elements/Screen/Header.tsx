import { isTablet } from "react-native-device-info"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NAVBAR_HEIGHT, ZINDEX } from "./constants"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { ArrowLeftIcon } from "../../svgs/ArrowLeftIcon"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

export interface HeaderProps {
  animated?: boolean
  hideLeftElements?: boolean
  hideRightElements?: boolean
  hideTitle?: boolean
  leftElements?: React.ReactNode
  onBack?: () => void
  rightElements?: React.ReactNode
  scrollY?: number
  title?: string
  titleShown?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  hideLeftElements,
  hideRightElements,
  hideTitle,
  leftElements,
  onBack,
  rightElements,
  title,
}) => {
  const insets = useSafeAreaInsets()

  const Left = () => {
    if (hideLeftElements) {
      return null
    }

    return (
      <>
        {leftElements ? (
          <>{leftElements}</>
        ) : (
          // If no left elements passed, show back button
          <Touchable onPress={onBack} underlayColor="transparent" hitSlop={DEFAULT_HIT_SLOP}>
            <ArrowLeftIcon fill="onBackgroundHigh" marginLeft="-4px" top="1px" />
          </Touchable>
        )}

        <Spacer x={1} />
      </>
    )
  }

  const Center = () => {
    if (hideTitle) {
      return null
    }

    return (
      <Flex width={isTablet() ? "100%" : "70%"} flex={1}>
        <Text variant="md" numberOfLines={1}>
          {title}
        </Text>
      </Flex>
    )
  }

  const Right = () => {
    if (hideRightElements) {
      return null
    }

    return (
      <>
        <Spacer x={1} />
        {rightElements}
      </>
    )
  }

  return (
    <Flex
      height={NAVBAR_HEIGHT}
      flexDirection="row"
      px={2}
      top={insets.top}
      zIndex={ZINDEX.header}
      backgroundColor="background"
      alignItems="center"
    >
      <Left />
      <Center />
      <Right />
    </Flex>
  )
}

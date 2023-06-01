import Animated, { Easing, FadeInDown, FadeOut } from "react-native-reanimated"
import { NAVBAR_HEIGHT, ZINDEX } from "./constants"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { ArrowLeftIcon } from "../../svgs/ArrowLeftIcon"
import { Flex, FlexProps } from "../Flex"
import { Spacer } from "../Spacer"
import { useTabsContext } from "../Tabs/TabsContext"
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
  titleProps?: FlexProps
  titleShown?: boolean
}

export const AnimatedTabsHeader: React.FC<HeaderProps> = (props) => {
  const { currentScrollY } = useTabsContext()

  return <Header scrollY={currentScrollY} animated={true} {...props} />
}

export const Header: React.FC<HeaderProps> = ({
  animated = false,
  hideLeftElements,
  hideRightElements,
  hideTitle,
  leftElements,
  onBack,
  rightElements,
  scrollY = 0,
  title,
  titleProps = {},
}) => {
  const Left = () => {
    if (hideLeftElements) {
      return null
    }

    return (
      <Flex pr={1}>
        {leftElements ? (
          <>{leftElements}</>
        ) : (
          // If no left elements passed, show back button
          <Touchable onPress={onBack} underlayColor="transparent" hitSlop={DEFAULT_HIT_SLOP}>
            <ArrowLeftIcon fill="onBackgroundHigh" top="2px" />
          </Touchable>
        )}

        <Spacer x={1} />
      </Flex>
    )
  }

  const Center = () => {
    if (hideTitle) {
      return null
    }

    if (!animated) {
      return (
        <Flex flex={1} {...titleProps} justifySelf="stretch">
          <Text variant="md" numberOfLines={1}>
            {title}
          </Text>
        </Flex>
      )
    }

    if (scrollY < NAVBAR_HEIGHT) {
      return <Flex flex={1} flexDirection="row" />
    }

    return (
      <>
        <Animated.View
          entering={FadeInDown.duration(400).easing(Easing.out(Easing.exp))}
          exiting={FadeOut.duration(400).easing(Easing.out(Easing.exp))}
          style={{
            flex: 1,
          }}
        >
          <Flex alignItems="center">
            <Text variant="md" numberOfLines={1}>
              {title}
            </Text>
          </Flex>
        </Animated.View>
      </>
    )
  }

  const Right = () => {
    if (hideRightElements) {
      return null
    }

    return (
      <Flex pl={1}>
        <Spacer x={1} />
        {rightElements}
      </Flex>
    )
  }

  return (
    <Flex
      height={NAVBAR_HEIGHT}
      flexDirection="row"
      px={2}
      py={1}
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

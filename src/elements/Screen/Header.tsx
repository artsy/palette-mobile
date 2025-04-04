import { MotiView } from "moti"
import React from "react"
import { Dimensions } from "react-native"
import Animated, { Easing, FadeIn, FadeOut, useDerivedValue } from "react-native-reanimated"
import { useScreenScrollContext } from "./ScreenScrollContext"
import { BOTTOM_TABS_HEIGHT, STICKY_BAR_HEIGHT } from "./StickySubHeader"
import { NAVBAR_HEIGHT, ZINDEX } from "./constants"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { ArrowLeftIcon } from "../../svgs/ArrowLeftIcon"
import { Flex, FlexProps } from "../Flex"
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
  // For header with more content use the offset to achieve a more granular control when to show the animated header
  scrollYOffset?: number
  title?: string | JSX.Element
  titleProps?: FlexProps
  titleShown?: boolean
}

export const AnimatedHeader: React.FC<HeaderProps> = (props) => {
  return <Header animated={true} {...props} />
}

export const Header: React.FC<HeaderProps> = ({
  animated = false,
  hideLeftElements,
  hideRightElements,
  hideTitle,
  leftElements,
  onBack,
  rightElements,
  title,
  titleProps = {},
}) => {
  return (
    <Flex
      height={NAVBAR_HEIGHT}
      flexDirection="row"
      px={2}
      zIndex={ZINDEX.header}
      backgroundColor="background"
      alignItems="center"
    >
      <Flex flex={1}>
        <Left leftElements={leftElements} onBack={onBack} hideLeftElements={hideLeftElements} />
      </Flex>

      <Flex {...titleProps}>
        <Center animated={animated} title={title} hideTitle={hideTitle} />
      </Flex>

      <Flex flex={1} alignItems="flex-end">
        <Right rightElements={rightElements} hideRightElements={hideRightElements} />
      </Flex>
    </Flex>
  )
}

const Right: React.FC<{
  hideRightElements: HeaderProps["hideRightElements"]
  rightElements: React.ReactNode
}> = ({ hideRightElements, rightElements }) => {
  return <>{!hideRightElements && rightElements}</>
}

const Center: React.FC<{
  animated: boolean
  hideTitle: HeaderProps["hideTitle"]
  title: HeaderProps["title"]
}> = ({ animated, hideTitle, title }) => {
  const {
    scrollYOffset = 0,
    currentScrollYAnimated,
    scrollViewDimensionsAnimated,
  } = useScreenScrollContext()
  const { height: screenHeight } = Dimensions.get("window")

  const scrollViewContentHeight =
    screenHeight - NAVBAR_HEIGHT - STICKY_BAR_HEIGHT - BOTTOM_TABS_HEIGHT

  // Show / hide the title to avoid rerenders, which retrigger the animation
  const display = useDerivedValue(() => {
    // The user is scrolling on a screen that is too small to show the small header
    if (scrollViewDimensionsAnimated?.value < scrollViewContentHeight) {
      return "none"
    }
    return currentScrollYAnimated.value < NAVBAR_HEIGHT + scrollYOffset ? "none" : "flex"
  }, [currentScrollYAnimated, scrollYOffset])

  if (hideTitle) {
    return null
  }

  const titleTextElement = (
    <Text variant="sm-display" numberOfLines={1}>
      {title}
    </Text>
  )

  if (!animated) {
    return titleTextElement
  }

  return (
    <Animated.View
      entering={FadeIn.duration(400).easing(Easing.out(Easing.exp))}
      exiting={FadeOut.duration(400).easing(Easing.out(Easing.exp))}
      style={{
        display: display.value,
      }}
    >
      <MotiView
        animate={{
          opacity: display.value === "flex" ? 1 : 0,
        }}
      >
        {titleTextElement}
      </MotiView>
    </Animated.View>
  )
}

const Left: React.FC<{
  hideLeftElements: HeaderProps["hideLeftElements"]
  leftElements: HeaderProps["leftElements"]
  onBack: HeaderProps["onBack"]
}> = ({ hideLeftElements, leftElements, onBack }) => {
  if (hideLeftElements) return null

  return (
    <>
      {leftElements || (
        <Touchable onPress={onBack} underlayColor="transparent" hitSlop={DEFAULT_HIT_SLOP}>
          <ArrowLeftIcon fill="onBackgroundHigh" />
        </Touchable>
      )}
    </>
  )
}

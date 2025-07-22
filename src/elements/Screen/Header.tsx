import React from "react"
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"
import { useScreenScrollContext } from "./ScreenScrollContext"
import { NAVBAR_HEIGHT, ZINDEX } from "./constants"
import { DEFAULT_HIT_SLOP, DEFAULT_ICON_SIZE } from "../../constants"
import { ArrowLeftIcon } from "../../svgs/ArrowLeftIcon"
import { useScreenDimensions, useSpace } from "../../utils/hooks"
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
  const { width } = useScreenDimensions()
  const space = useSpace()

  // Assumes small left and right elements, it protects from overflowing
  // but doesn't cover edge cases where right or left are bigger
  const centerMaxWidth = width - space(4) - DEFAULT_ICON_SIZE * 2

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

      <Flex maxWidth={centerMaxWidth} {...titleProps}>
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
  const { scrollYOffset = 0, currentScrollYAnimated } = useScreenScrollContext()

  // Show / hide the title to avoid rerenders, which retrigger the animation
  const display = useDerivedValue(() => {
    return currentScrollYAnimated.value < NAVBAR_HEIGHT + scrollYOffset ? "none" : "flex"
  }, [currentScrollYAnimated, scrollYOffset])

  const opacity = useDerivedValue(() => {
    return display.value === "flex" ? 1 : 0
  })
  const style = useAnimatedStyle(() => {
    return {
      display: display.value,
      opacity: opacity.value,
    }
  })

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
      style={[style, { flex: 1 }]}
    >
      {titleTextElement}
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
        <Touchable
          accessibilityRole="button"
          accessibilityLabel="Back"
          accessibilityHint="Navigates to the previous screen"
          onPress={onBack}
          underlayColor="transparent"
          hitSlop={DEFAULT_HIT_SLOP}
        >
          <ArrowLeftIcon fill="onBackgroundHigh" />
        </Touchable>
      )}
    </>
  )
}

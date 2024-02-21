import { MotiView } from "moti"
import React from "react"
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated"
import { useScreenScrollContext } from "./ScreenScrollContext"
import { NAVBAR_HEIGHT, ZINDEX } from "./constants"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { ArrowLeftIcon } from "../../svgs/ArrowLeftIcon"
import { Flex, FlexProps } from "../Flex"
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
      py={1}
      zIndex={ZINDEX.header}
      backgroundColor="background"
      alignItems="center"
      width="100%"
    >
      <Left leftElements={leftElements} onBack={onBack} hideLeftElements={hideLeftElements} />
      <Center animated={animated} titleProps={titleProps} title={title} hideTitle={hideTitle} />
      <Right rightElements={rightElements} hideRightElements={hideRightElements} />
    </Flex>
  )
}

const Right: React.FC<{
  hideRightElements: HeaderProps["hideRightElements"]
  rightElements: React.ReactNode
}> = ({ hideRightElements, rightElements }) => {
  if (hideRightElements) {
    return null
  }

  return (
    <Flex width={50} alignItems="flex-end">
      <Spacer x={1} />
      {rightElements}
    </Flex>
  )
}

const Center: React.FC<{
  animated: boolean
  hideTitle: HeaderProps["hideTitle"]
  titleProps: HeaderProps["titleProps"]
  title: HeaderProps["title"]
}> = ({ animated, hideTitle, titleProps, title }) => {
  const { scrollYOffset = 0, currentScrollY = 0 } = useScreenScrollContext()

  if (hideTitle) {
    return null
  }

  if (!animated) {
    return (
      <Flex flex={1} flexDirection="row" width="100%">
        <Flex alignItems="center" width="100%" {...titleProps}>
          <Text variant="sm-display" numberOfLines={1}>
            {title}
          </Text>
        </Flex>
      </Flex>
    )
  }

  // Show / hide the title to avoid rerenders, which retrigger the animation
  const display = currentScrollY < NAVBAR_HEIGHT + scrollYOffset ? "none" : "flex"

  return (
    <Flex flex={1} flexDirection="row">
      <Animated.View
        entering={FadeIn.duration(400).easing(Easing.out(Easing.exp))}
        exiting={FadeOut.duration(400).easing(Easing.out(Easing.exp))}
        style={{
          display,
          flex: 1,
        }}
      >
        <Flex alignItems="center" width="100%" {...titleProps}>
          <MotiView
            animate={{
              opacity: display === "flex" ? 1 : 0,
            }}
          >
            <Text variant="sm-display" numberOfLines={1}>
              {title}
            </Text>
          </MotiView>
        </Flex>
      </Animated.View>
    </Flex>
  )
}

const Left: React.FC<{
  hideLeftElements: HeaderProps["hideLeftElements"]
  leftElements: HeaderProps["leftElements"]
  onBack: HeaderProps["onBack"]
}> = ({ hideLeftElements, leftElements, onBack }) => {
  if (hideLeftElements) {
    return null
  }

  return (
    <Flex pr={1} width={50}>
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

import { MotiView } from "moti"
import { useState } from "react"
import { LayoutChangeEvent } from "react-native"
import Animated, { LinearTransition, useAnimatedStyle, withTiming } from "react-native-reanimated"
import { useShowLargeTitle } from "./hooks/useShowLargeTitle"
import { useSpace } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Separator } from "../Separator"
import { Text } from "../Text"

export interface StickySubHeaderProps extends React.PropsWithChildren<{}> {
  title: string
  /**
   * largeTitle will make the title use the `xl` variant;
   */
  largeTitle?: boolean
  separatorComponent?: React.ReactNode
  subTitle?: string
  Component?: React.ReactNode
}

export const STICKY_BAR_HEIGHT = 42
export const DEFAULT_SEPARATOR_COMPONENT = <Separator borderColor="black5" />
export const BOTTOM_TABS_HEIGHT = 65

export const StickySubHeader: React.FC<StickySubHeaderProps> = ({
  title,
  largeTitle = false,
  separatorComponent = DEFAULT_SEPARATOR_COMPONENT,
  subTitle,
  children,
  Component,
}) => {
  const space = useSpace()

  const [stickyBarHeight, setStickyHeaderHeight] = useState<null | number>(null)
  const { visible } = useShowLargeTitle({ stickyBarHeight })

  const handleLayout = (event: LayoutChangeEvent) => {
    setStickyHeaderHeight(event.nativeEvent.layout.height)
  }

  // The styles are kept in a variable to make sure they're always in sync with the hidden text component
  const sharedStyles = {
    paddingHorizontal: space(2),
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(visible.value ? stickyBarHeight || STICKY_BAR_HEIGHT : 0, {
        duration: 200,
      }),
      transform: [
        {
          translateY: withTiming(visible.value ? 0 : -(stickyBarHeight || STICKY_BAR_HEIGHT), {
            duration: 100,
          }),
        },
      ],
    }
  }, [visible.value, stickyBarHeight])

  return (
    <Flex>
      {/* We only want this on mount in order to calculate sticky header height */}
      {stickyBarHeight === null && (
        <Flex
          onLayout={(event) => handleLayout(event)}
          position="absolute"
          backgroundColor="white100"
          zIndex={-1000}
          style={sharedStyles}
        >
          <Flex mb={1}>
            <Text variant={largeTitle ? "xl" : "lg-display"} color="white100">
              {title}
            </Text>
            {!!subTitle && (
              <Text variant="xs" mt={0.5} color="white100">
                {subTitle}
              </Text>
            )}
            {Component}
          </Flex>
        </Flex>
      )}

      <Animated.View style={[sharedStyles, animatedStyles]}>
        {/* If we don't specify a height for the text, we will get text jumps as the parent component height changes  */}
        <Flex style={{ height: stickyBarHeight }} mb={1}>
          <Text variant={largeTitle ? "xl" : "lg-display"}>{title}</Text>
          {subTitle && (
            <Text variant="xs" mt={0.5}>
              {subTitle}
            </Text>
          )}
          {Component}
        </Flex>
      </Animated.View>

      {children}

      {/* check if children are defined, return children below */}
      {children !== undefined && separatorComponent}
    </Flex>
  )
}

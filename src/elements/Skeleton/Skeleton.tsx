import { FC, ReactNode, useEffect } from "react"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { useColor } from "../../utils/hooks"
import { Flex, FlexProps } from "../Flex"
import { Text, TextProps } from "../Text"

/**
 * Creates a skeleton animation for a component.
 *
 * @example
 *
 * <Skeleton>
 *   <SkeletonText>Foo</SkeletonText>
 *   <SkeletonBox width={100} height={100} />
 * </Skeleton>
 */
export const Skeleton: FC<{ children: ReactNode }> = ({ children }) => {
  const opacity = useSharedValue(0.5)

  useEffect(() => {
    opacity.set(() => withRepeat(withTiming(1, { duration: 1000, easing: Easing.ease }), -1, true))
  }, [opacity])

  const fadeLoopAnim = useAnimatedStyle(() => {
    return { opacity: opacity.get() }
  }, [])

  return <Animated.View style={fadeLoopAnim}>{children}</Animated.View>
}

export const SkeletonText: FC<TextProps> = ({ children, ...rest }) => {
  const color = useColor()

  return (
    <Flex alignSelf="flex-start">
      <Text {...rest} bg={color("black10")} color="transparent">
        {children}
      </Text>
    </Flex>
  )
}

export const SkeletonBox: FC<FlexProps> = ({ children, ...rest }) => {
  const color = useColor()

  return (
    <Flex {...rest} bg={color("black10")}>
      {children}
    </Flex>
  )
}

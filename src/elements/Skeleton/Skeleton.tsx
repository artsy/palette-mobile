import { FC, ReactNode, useEffect, useRef } from "react"
// import Animated from "react-native-reanimated"
import { Animated } from "react-native"
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
  const opacity = useRef(new Animated.Value(0.5))

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacity.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: opacity.current,
      }}
    >
      {children}
    </Animated.View>
  )
}

export const SkeletonText: FC<TextProps> = ({ children, ...rest }) => {
  const color = useColor()

  return (
    <Flex alignSelf="flex-start">
      <Text {...rest} bg={color("mono10")} color="transparent">
        {children}
      </Text>
    </Flex>
  )
}

export const SkeletonBox: FC<FlexProps> = ({ children, ...rest }) => {
  const color = useColor()

  return (
    <Flex {...rest} bg={color("mono10")}>
      {children}
    </Flex>
  )
}

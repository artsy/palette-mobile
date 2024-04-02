import { ImgHTMLAttributes, useState } from "react"
import { Image } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated"
import { useColor } from "../../utils/hooks"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Text, TextProps } from "../Text"

export type AvatarSize = "xxs" | "xs" | "sm" | "md"

export interface AvatarProps extends ImgHTMLAttributes<any> {
  src?: string
  /** If an image is missing, show initials instead */
  initials?: string
  /** The size of the Avatar */
  size?: AvatarSize
}

const DEFAULT_SIZE: AvatarSize = "md"

const VARIANTS: Record<AvatarSize, { diameter: number; textSize: TextProps["variant"] }> = {
  xxs: {
    diameter: 30,
    textSize: "xs",
  },
  xs: {
    diameter: 45,
    textSize: "sm-display",
  },

  sm: {
    diameter: 70,
    textSize: "md",
  },
  md: {
    diameter: 100,
    textSize: "lg-display",
  },
}

/** A circular Avatar component containing an image or initials */
export const Avatar = ({ src, initials, size = DEFAULT_SIZE }: AvatarProps) => {
  const color = useColor()
  const [loading, setLoading] = useState(true)

  const opacity = useSharedValue(0)

  opacity.value = withDelay(
    100,
    withTiming(1, {
      duration: 200,
      easing: Easing.sin,
    })
  )

  const style = useAnimatedStyle(() => {
    return {
      opacity: loading ? 0 : opacity.value,
    }
  }, [loading])

  const { diameter, textSize } = VARIANTS[size]

  if (src) {
    return (
      <Box
        width={diameter}
        height={diameter}
        borderRadius={diameter / 2}
        overflow="hidden"
        borderColor={color("white100")}
        borderWidth={1}
      >
        <Animated.View style={style}>
          <Image
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            resizeMode="cover"
            source={{ uri: src }}
            accessibilityLabel="AvatarImage"
            style={{
              width: diameter,
              height: diameter,
            }}
          />
        </Animated.View>
      </Box>
    )
  }

  return (
    <Flex
      width={diameter}
      height={diameter}
      borderColor="black10"
      borderWidth={1}
      borderRadius={diameter}
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      accessibilityLabel="Avatar"
    >
      <Text variant={textSize}>{initials}</Text>
    </Flex>
  )
}

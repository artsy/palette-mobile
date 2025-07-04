import { MotiView } from "moti"
import { ImgHTMLAttributes } from "react"
import { FadeIn } from "react-native-reanimated"
import { useColor } from "../../utils/hooks"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Image } from "../Image/Image"
import { Text, TextProps } from "../Text"

export type AvatarSize = "xxs" | "xs" | "sm" | "md"

export interface AvatarProps extends ImgHTMLAttributes<any> {
  blurhash?: string | null
  /** If an image is missing, show initials instead */
  initials?: string
  /** The size of the Avatar */
  size?: AvatarSize
  src?: string
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
export const Avatar = ({ src, initials, size = DEFAULT_SIZE, blurhash }: AvatarProps) => {
  const color = useColor()

  const { diameter, textSize } = VARIANTS[size]

  if (src) {
    return (
      <MotiView entering={FadeIn}>
        <Box
          width={diameter}
          height={diameter}
          borderRadius={diameter / 2}
          overflow="hidden"
          borderColor={color("mono0")}
          borderWidth={1}
        >
          <Image
            blurhash={blurhash}
            resizeMode="cover"
            src={src}
            height={diameter}
            width={diameter}
            accessibilityLabel="AvatarImage"
            style={{
              width: diameter,
              height: diameter,
            }}
          />
        </Box>
      </MotiView>
    )
  }

  return (
    <Flex
      width={diameter}
      height={diameter}
      borderColor="mono10"
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

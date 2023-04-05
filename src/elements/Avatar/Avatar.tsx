import { ImgHTMLAttributes } from "react"
import { Image } from "react-native"
import { useColor } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Text, TextProps } from "../Text"

type AvatarSize = "xxs" | "xs" | "sm" | "md"

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
  const { diameter, textSize } = VARIANTS[size]

  if (src) {
    return (
      <Image
        resizeMode="cover"
        style={{
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
          borderColor: color("white100"),
          borderWidth: 1,
        }}
        source={{ uri: src }}
        accessibilityLabel="AvatarImage"
      />
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

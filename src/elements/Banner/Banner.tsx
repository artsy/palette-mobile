import { useRef, useState } from "react"
import { Animated, Easing, TouchableOpacity } from "react-native"
import { FlexProps } from "styled-system"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { CloseIcon } from "../../svgs"
import { Flex } from "../Flex"
import { Text } from "../Text"

export type BannerVariant = keyof typeof BANNER_VARIANTS

export interface CommonBannerProps extends FlexProps {
  onClose?: () => void
  dismissable?: boolean
  variant?: BannerVariant
}

type BannerWithText = CommonBannerProps & { text: string; children?: never }
type BannerWithChildren = CommonBannerProps & { text?: never; children: React.ReactNode }

export type BannerProps = BannerWithText | BannerWithChildren

export const Banner = ({
  text,
  onClose,
  dismissable = false,
  variant = "defaultLight",
  children,
  ...restProps
}: BannerProps) => {
  const [tempHeight, setTempHeight] = useState<number | undefined>(undefined)

  const scaleYAnim = useRef(new Animated.Value(0)).current

  const handleClose = () => {
    Animated.timing(scaleYAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setTempHeight(0)
    })

    onClose?.()
  }

  return (
    <Animated.View
      accessibilityLabel="Banner"
      style={{
        height: tempHeight,
        transform: [
          {
            scaleY: scaleYAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ],
      }}
    >
      <Flex backgroundColor={BANNER_VARIANTS[variant].backgroundColor} {...restProps}>
        <Flex px={2} py={1} flexDirection="row" alignItems="center" justifyContent="space-between">
          {text ? (
            <Flex flex={1} alignItems="center">
              <Text textAlign="center" variant="xs" color={BANNER_VARIANTS[variant].color}>
                {text}
              </Text>
            </Flex>
          ) : (
            <Flex flex={1}>{children}</Flex>
          )}

          {!!dismissable && (
            <Flex>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close"
                accessibilityHint="Dismiss banner"
                testID="banner-close-button"
                onPress={handleClose}
                hitSlop={DEFAULT_HIT_SLOP}
              >
                <CloseIcon fill={BANNER_VARIANTS[variant].color} />
              </TouchableOpacity>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Animated.View>
  )
}

const BANNER_VARIANTS = {
  defaultLight: {
    backgroundColor: "mono10",
    color: "mono100",
  },
  defaultDark: {
    backgroundColor: "mono100",
    color: "mono0",
  },
  success: {
    backgroundColor: "green100",
    color: "mono0",
  },
  error: {
    backgroundColor: "red100",
    color: "mono0",
  },
  brand: {
    backgroundColor: "brand",
    color: "mono0",
  },
}

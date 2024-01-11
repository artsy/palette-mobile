import { useRef, useState } from "react"
import { Animated, Easing, TouchableOpacity } from "react-native"
import { FlexProps } from "styled-system"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { CloseIcon } from "../../svgs"
import { Flex } from "../Flex"
import { Text } from "../Text"

export type BannerVariant = keyof typeof BANNER_VARIANTS

export interface BannerProps extends FlexProps {
  text: string
  onClose?: () => void
  dismissable?: boolean
  variant?: BannerVariant
}

export const Banner = ({
  text,
  onClose,
  dismissable = false,
  variant = "defaultLight",
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
          <Flex flex={1} alignItems="center">
            <Text textAlign="center" variant="xs" color={BANNER_VARIANTS[variant].color}>
              {text}
            </Text>
          </Flex>

          {!!dismissable && (
            <Flex>
              <TouchableOpacity
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
    backgroundColor: "black10",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
    color: "white100",
  },
  success: {
    backgroundColor: "green100",
    color: "white100",
  },
  error: {
    backgroundColor: "red100",
    color: "white100",
  },
  brand: {
    backgroundColor: "brand",
    color: "white100",
  },
}

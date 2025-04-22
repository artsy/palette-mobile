import { Color } from "@artsy/palette-tokens/dist/themes/v3"
import { useRef, useState } from "react"
import { Animated, Easing, TouchableOpacity } from "react-native"
import { CloseIcon } from "../../svgs"
import { useColor } from "../../utils/hooks/useColor"
import { Flex, FlexProps } from "../Flex"
import { Text, TextProps } from "../Text"

type MessageVariant = "default" | "info" | "success" | "alert" | "warning" | "error" | "dark"

export interface MessageProps {
  bodyTextStyle?: TextProps
  containerStyle?: FlexProps
  IconComponent?: React.FC<any>
  iconPosition?: "left" | "right" | "bottom"
  onClose?: () => void
  showCloseButton?: boolean
  testID?: string
  text?: string
  title?: string
  titleStyle?: TextProps
  variant?: MessageVariant
}

export const Message: React.FC<MessageProps> = ({
  bodyTextStyle,
  children,
  containerStyle,
  IconComponent,
  iconPosition = "left",
  onClose,
  showCloseButton = false,
  testID,
  text,
  title,
  titleStyle,
  variant = "default",
}) => {
  const color = useColor()

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
      testID={testID}
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
      <Flex px={2} backgroundColor={color(colors[variant].background)} {...containerStyle}>
        <Flex py={1} flexDirection="row" justifyContent="space-between">
          <Flex flex={1}>
            <Flex flexDirection="row">
              {!!IconComponent && iconPosition === "left" && (
                <Flex mr={1} testID="icon-component-left">
                  <IconComponent />
                </Flex>
              )}
              {!!title && (
                <Text pr={2} variant="xs" color={color(colors[variant].title)} {...titleStyle}>
                  {title}
                </Text>
              )}
            </Flex>
            {!!text && (
              <Text variant="xs" color={color(colors[variant].text)} {...bodyTextStyle}>
                {text}
              </Text>
            )}
            {children}
          </Flex>

          {!!IconComponent && iconPosition === "right" && (
            <Flex
              mr={showCloseButton ? 1 : 0}
              justifyContent="center"
              testID="icon-component-right"
            >
              <IconComponent />
            </Flex>
          )}

          {!!showCloseButton && (
            <Flex style={{ marginTop: 2 }}>
              <TouchableOpacity
                testID="Message-close-button"
                onPress={handleClose}
                hitSlop={{ bottom: 10, right: 10, left: 10, top: 10 }}
              >
                <CloseIcon fill={colors[variant].icon} />
              </TouchableOpacity>
            </Flex>
          )}
        </Flex>

        {!!IconComponent && iconPosition === "bottom" && (
          <Flex mb={1} justifyContent="center" testID="icon-component-bottom">
            <IconComponent />
          </Flex>
        )}
      </Flex>
    </Animated.View>
  )
}

const colors: Record<
  MessageVariant,
  { background: Color; title: Color; text: Color; icon?: Color }
> = {
  default: {
    background: "mono5",
    title: "mono100",
    text: "mono60",
    icon: "mono100",
  },
  info: {
    background: "blue10",
    title: "blue100",
    // The text should be black regardless of the theme
    // @ts-expect-error
    text: "black",
    icon: "mono100",
  },
  success: {
    background: "green10",
    title: "green150",
    text: "mono100",
    icon: "mono100",
  },
  alert: {
    background: "orange10",
    title: "orange150",
    text: "mono100",
    icon: "mono100",
  },
  warning: {
    background: "yellow10",
    title: "yellow150",
    text: "mono100",
    icon: "mono100",
  },
  error: {
    background: "red10",
    title: "red100",
    text: "mono100",
    icon: "mono100",
  },
  dark: {
    background: "mono100",
    title: "mono0",
    text: "mono0",
    icon: "mono0",
  },
}

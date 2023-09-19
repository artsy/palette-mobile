import { Color, THEME } from "@artsy/palette-tokens"
import { Platform, StatusBar, ViewStyle } from "react-native"
import RNPopover from "react-native-popover-view"
import { Easing } from "react-native-reanimated"
import styled from "styled-components"
import { CloseIcon } from "../../svgs"
import { Flex } from "../Flex"
import { Touchable } from "../Touchable"

interface PopoverProps {
  children?: React.ReactElement
  variant?: PopoverVariant
  title?: React.ReactElement
  content?: React.ReactElement
  onPressOutside?: () => void
  // Called when its dismissed
  onDismiss?: () => void
  // Special case, use this when chaining multiple elements that need
  // to be displayed in a chained way
  onCloseComplete?: RNPopover["props"]["onCloseComplete"]
  placement?: "top" | "bottom" | "left" | "right"
  noCloseIcon?: boolean
  visible?: boolean
}

export const Popover = ({
  variant = "dark",
  children,
  visible,
  onPressOutside,
  onDismiss,
  onCloseComplete,
  placement = "top",
  title,
  content,
  noCloseIcon,
}: PopoverProps) => {
  const style = POPOVER_VARIANTS[variant]

  return (
    <RNPopover
      backgroundStyle={{ opacity: 0.5, backgroundColor: THEME.colors["black100"] }}
      popoverStyle={[{ backgroundColor: style.backgroundColor }, style.shadow]}
      from={children}
      isVisible={visible}
      // this is required to make sure that the popover is positioned correctly on android
      verticalOffset={Platform.OS === "android" ? -(StatusBar.currentHeight ?? 0) : 0}
      onCloseComplete={onCloseComplete}
      onRequestClose={onPressOutside}
      placement={placement as RNPopover["props"]["placement"]}
      arrowSize={{ height: 11, width: 22 }}
      animationConfig={{
        duration: 400,
        easing: Easing.out(Easing.exp),
      }}
    >
      <Container variant={variant} p={1}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          {title ? title : <Flex />}
          {!noCloseIcon && (
            <Touchable onPress={onDismiss}>
              <Flex ml={0.5}>
                <CloseIcon width={18} height={18} fill={style.fill} />
              </Flex>
            </Touchable>
          )}
        </Flex>

        {content}
      </Container>
    </RNPopover>
  )
}

const Container = styled(Flex)<{ variant: PopoverVariant }>`
  background-color: ${({ variant }) => POPOVER_VARIANTS[variant].backgroundColor};
`

const DROP_SHADOW = {
  shadowColor: THEME.colors["black100"],
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
}

export const POPOVER_VARIANTS: Record<
  "light" | "dark",
  { backgroundColor: string; fill: Color; shadow?: ViewStyle }
> = {
  light: {
    backgroundColor: THEME.colors["white100"],
    fill: "black100",
    shadow: DROP_SHADOW,
  },
  dark: {
    backgroundColor: THEME.colors["black100"],
    fill: "white100",
  },
}

export type PopoverVariant = keyof typeof POPOVER_VARIANTS

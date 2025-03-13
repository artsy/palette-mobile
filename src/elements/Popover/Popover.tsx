import { Color } from "@artsy/palette-tokens"
import { Platform, StatusBar, ViewStyle } from "react-native"
import RNPopover from "react-native-popover-view"
import { Easing } from "react-native-reanimated"
import { CloseIcon } from "../../svgs"
import { useColor } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Touchable } from "../Touchable"

interface PopoverProps {
  children?: React.ReactElement
  variant?: PopoverVariant
  title?: React.ReactElement
  content?: React.ReactElement
  onOpenComplete?: () => void
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
  onOpenComplete,
  onPressOutside,
  onDismiss,
  onCloseComplete,
  placement = "top",
  title,
  content,
  noCloseIcon,
}: PopoverProps) => {
  const color = useColor()

  const DROP_SHADOW = {
    shadowColor: color("black100"),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }

  const POPOVER_VARIANTS: Record<
    "light" | "dark",
    { backgroundColor: string; fill: Color; shadow?: ViewStyle }
  > = {
    light: {
      backgroundColor: color("white100"),
      fill: "black100",
      shadow: DROP_SHADOW,
    },
    dark: {
      backgroundColor: color("black100"),
      fill: "white100",
    },
  }

  const style = POPOVER_VARIANTS[variant]

  return (
    <RNPopover
      backgroundStyle={{ opacity: 0.5, backgroundColor: color("black100") }}
      popoverStyle={[{ backgroundColor: style.backgroundColor }, style.shadow]}
      from={children}
      isVisible={visible}
      // this is required to make sure that the popover is positioned correctly on android
      verticalOffset={Platform.OS === "android" ? -(StatusBar.currentHeight ?? 0) : 0}
      onCloseComplete={onCloseComplete}
      onOpenComplete={onOpenComplete}
      onRequestClose={onPressOutside}
      placement={placement as RNPopover["props"]["placement"]}
      arrowSize={{ height: 11, width: 22 }}
      animationConfig={{
        duration: 400,
        easing: Easing.out(Easing.exp),
      }}
    >
      <Flex backgroundColor={POPOVER_VARIANTS[variant].backgroundColor} p={1}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          {title ? title : <Flex />}
          {!noCloseIcon && (
            <Touchable onPress={onDismiss} accessibilityRole="button" aria-label="Dismiss popover">
              <Flex ml={0.5}>
                <CloseIcon width={18} height={18} fill={style.fill} />
              </Flex>
            </Touchable>
          )}
        </Flex>

        {content}
      </Flex>
    </RNPopover>
  )
}

export type PopoverVariant = "light" | "dark"

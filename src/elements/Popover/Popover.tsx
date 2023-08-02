import { Color, THEME } from "@artsy/palette-tokens"
import { ViewStyle } from "react-native"
import RNPopover from "react-native-popover-view"
import styled from "styled-components"
import { CloseIcon } from "../../svgs"
import { shadows } from "../../utils/shadows"
import { Flex } from "../Flex"
import { Touchable } from "../Touchable"

interface PopoverProps {
  children?: React.ReactElement
  variant?: PopoverVariant
  title?: React.ReactElement
  content?: React.ReactElement
  onPressOutside?: () => void
  // called when its dismissed
  onDismiss?: () => void
  // special case, use this when chaining multiple elements that need
  // to be displayed in a chained way
  onCloseComplete?: RNPopover["props"]["onCloseComplete"]
  placement?: "top" | "bottom" | "left" | "right"
  noCloseIcon?: boolean
  visible?: boolean
}

/**
 * Popover has a limitation from the lib we use, we cannot display
 */
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
      backgroundStyle={{ opacity: 1, backgroundColor: "transparent" }}
      popoverStyle={[{ backgroundColor: style.backgroundColor }, style.shadow]}
      from={children}
      isVisible={visible}
      onCloseComplete={onCloseComplete}
      onRequestClose={onPressOutside}
      placement={placement as RNPopover["props"]["placement"]}
      arrowSize={{ height: 11, width: 22 }}
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

export const POPOVER_VARIANTS: Record<
  "light" | "dark",
  { backgroundColor: string; fill: Color; shadow?: ViewStyle }
> = {
  light: {
    backgroundColor: THEME.colors["white100"],
    fill: "black100",
    shadow: shadows.DROP_SHADOW,
  },
  dark: {
    backgroundColor: THEME.colors["black100"],
    fill: "white100",
  },
}

export type PopoverVariant = keyof typeof POPOVER_VARIANTS

import { TouchableOpacity, ViewProps } from "react-native"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { ChevronIcon, CloseIcon } from "../../svgs"
import { Flex } from "../Flex"

export interface BackButtonProps {
  hitSlop?: ViewProps["hitSlop"]
  onPress?: () => void
  showX?: boolean
}

export const BackButton = ({
  hitSlop = DEFAULT_HIT_SLOP,
  onPress,
  showX = false,
}: BackButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={hitSlop}
    accessibilityRole="button"
    accessibilityLabel={showX ? "Close" : "Go back"}
    accessibilityHint={showX ? "Dismiss this screen" : "Go back to the previous screen"}
  >
    {showX ? (
      <CloseIcon fill="onBackgroundHigh" width={26} height={26} />
    ) : (
      <ChevronIcon direction="left" fill="onBackgroundHigh" />
    )}
  </TouchableOpacity>
)

export const BackButtonWithBackground = ({
  hitSlop = DEFAULT_HIT_SLOP,
  onPress,
  showX = false,
}: BackButtonProps) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
    <Flex
      backgroundColor="background"
      width={40}
      height={40}
      borderRadius={20}
      alignItems="center"
      justifyContent="center"
      accessibilityRole="button"
      accessibilityLabel={showX ? "Close" : "Go back"}
      accessibilityHint={showX ? "Dismiss this screen" : "Go back to the previous screen"}
    >
      {showX ? (
        <CloseIcon fill="onBackgroundHigh" width={26} height={26} />
      ) : (
        <ChevronIcon fill="onBackgroundHigh" direction="left" />
      )}
    </Flex>
  </TouchableOpacity>
)

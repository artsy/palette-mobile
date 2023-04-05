import { TouchableOpacity, TouchableOpacityProps, ViewProps } from "react-native"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { ChevronIcon, CloseIcon } from "../../svgs"
import { Color } from "../../types"
import { Flex } from "../Flex"

export interface BackButtonProps {
  color?: Color
  hitSlop?: ViewProps["hitSlop"]
  onPress?: () => void
  showX?: boolean
  style?: TouchableOpacityProps["style"]
}

export const BackButton: React.FC<BackButtonProps> = ({
  color = "onBackgroundHigh",
  hitSlop = DEFAULT_HIT_SLOP,
  onPress,
  showX = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={showX ? "Close" : "Go back"}
      accessibilityHint={showX ? "Dismiss this screen" : "Go back to the previous screen"}
      style={style}
    >
      {showX ? (
        <CloseIcon fill={color} width={26} height={26} />
      ) : (
        <ChevronIcon direction="left" fill={color} />
      )}
    </TouchableOpacity>
  )
}

export const BackButtonWithBackground: React.FC<BackButtonProps> = ({
  color = "onBackgroundHigh",
  hitSlop = DEFAULT_HIT_SLOP,
  onPress,
  showX = false,
  style,
}) => {
  return (
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
        style={style}
      >
        {showX ? (
          <CloseIcon fill={color} width={26} height={26} />
        ) : (
          <ChevronIcon fill={color} direction="left" />
        )}
      </Flex>
    </TouchableOpacity>
  )
}

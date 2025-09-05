import { ChevronSmallLeftIcon, CloseIcon } from "@artsy/icons/native"
import { TouchableOpacity, TouchableOpacityProps, ViewProps } from "react-native"
import { DEFAULT_HIT_SLOP } from "../../constants"
import { Color } from "../../types"
import { Flex } from "../Flex"

export interface BackButtonProps {
  color?: Color
  hitSlop?: ViewProps["hitSlop"]
  onPress?: () => void
  showX?: boolean
  style?: TouchableOpacityProps["style"]
  iconSize?: number
}

export const BackButton: React.FC<BackButtonProps> = ({
  color = "onBackgroundHigh",
  hitSlop = DEFAULT_HIT_SLOP,
  onPress,
  showX = false,
  style,
  iconSize = 18,
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
        <CloseIcon fill={color} width={iconSize} height={iconSize} />
      ) : (
        <ChevronSmallLeftIcon fill={color} height={iconSize} width={iconSize} />
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
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={showX ? "Close" : "Back"}
      accessibilityHint={showX ? "Closes the modal" : "Navigates to the previous screen"}
      onPress={onPress}
      hitSlop={hitSlop}
    >
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
          <ChevronSmallLeftIcon fill={color} />
        )}
      </Flex>
    </TouchableOpacity>
  )
}

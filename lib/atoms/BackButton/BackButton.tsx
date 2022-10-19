import { TouchableOpacity } from "react-native"
import { ChevronIcon, CloseIcon } from "../../svgs"
import { Flex } from "../Flex"

interface BackButtonProps {
  onPress?: () => void
  showX?: boolean
}

export const BackButton = ({ onPress, showX = false }: BackButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    {showX ? (
      <CloseIcon fill="onBackgroundHigh" width={26} height={26} />
    ) : (
      <ChevronIcon direction="left" fill="onBackgroundHigh" />
    )}
  </TouchableOpacity>
)

export const BackButtonWithBackground = ({ onPress, showX = false }: BackButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Flex
      backgroundColor="white100"
      width={40}
      height={40}
      borderRadius={20}
      alignItems="center"
      justifyContent="center"
    >
      {showX ? (
        <CloseIcon fill="onBackgroundHigh" width={26} height={26} />
      ) : (
        <ChevronIcon fill="onBackgroundHigh" direction="left" />
      )}
    </Flex>
  </TouchableOpacity>
)

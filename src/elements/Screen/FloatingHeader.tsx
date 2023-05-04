import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NAVBAR_HEIGHT, ZINDEX } from "./constants"
import { BackButtonWithBackground } from "../BackButton"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"

export interface FloatingHeaderProps {
  onBack?: () => void
  rightElements?: React.ReactNode
}

export const FloatingHeader = ({ onBack, rightElements }: FloatingHeaderProps) => {
  const insets = useSafeAreaInsets()

  return (
    <Flex
      position="absolute"
      pointerEvents="box-none"
      top={insets.top}
      left={0}
      right={0}
      zIndex={ZINDEX.floatingHeader}
      height={NAVBAR_HEIGHT}
      px={1}
      flexDirection="row"
      alignItems="center"
    >
      <BackButtonWithBackground onPress={onBack} />

      <Flex flex={1} />

      {rightElements && (
        <Flex flexDirection="row" alignItems="center">
          <Spacer x={1} />
          {rightElements}
        </Flex>
      )}
    </Flex>
  )
}

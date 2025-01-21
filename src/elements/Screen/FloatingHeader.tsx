import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ZINDEX } from "./constants"
import { BackButtonWithBackground } from "../BackButton"
import { Flex, FlexProps } from "../Flex"
import { Spacer } from "../Spacer"

export interface FloatingHeaderProps extends FlexProps {
  onBack?: () => void
  rightElements?: React.ReactNode
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  onBack,
  rightElements,
  ...flexProps
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Flex
      position="absolute"
      pointerEvents="box-none"
      top={insets.top}
      left={0}
      right={0}
      zIndex={ZINDEX.floatingHeader}
      px={1}
      py={1}
      flexDirection="row"
      alignItems="center"
      backgroundColor="background"
      {...flexProps}
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

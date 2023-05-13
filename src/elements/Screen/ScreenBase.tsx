import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Flex, FlexProps } from "../Flex"

export interface ScreenBaseProps {
  children: React.ReactNode
  safeArea?: boolean
}

export const ScreenBase: React.FC<ScreenBaseProps> = ({ children, safeArea = true }) => {
  const insets = useSafeAreaInsets()

  return (
    <Flex flex={1} backgroundColor="background" mt={safeArea ? (insets.top as FlexProps["mt"]) : 0}>
      {children}

      <SafeAreaCover safeArea />
    </Flex>
  )
}

const SafeAreaCover: React.FC<{ safeArea: boolean }> = ({ safeArea }) => {
  const insets = useSafeAreaInsets()

  return (
    <Flex
      position="absolute"
      left={0}
      right={0}
      top={safeArea ? -insets.top : 0}
      height={insets.top}
      backgroundColor="background"
    />
  )
}

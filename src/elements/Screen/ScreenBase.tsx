import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Flex } from "../Flex"

export const ScreenBase: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex flex={1} backgroundColor="background">
      {children}

      <SafeAreaCover />
    </Flex>
  )
}

const SafeAreaCover = () => {
  const insets = useSafeAreaInsets()

  return (
    <Flex
      position="absolute"
      left={0}
      right={0}
      top={0}
      height={insets.top}
      backgroundColor="background"
    />
  )
}

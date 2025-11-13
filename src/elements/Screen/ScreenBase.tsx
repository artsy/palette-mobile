import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenScrollContextProvider } from "./ScreenScrollContext"
import { Flex, FlexProps } from "../Flex"

export interface ScreenBaseProps extends FlexProps {
  children: React.ReactNode
  safeArea?: boolean
}

export const ScreenBase: React.FC<ScreenBaseProps> = ({
  children,
  safeArea = true,
  ...flexProps
}) => {
  const insets = useSafeAreaInsets()

  return (
    <ScreenScrollContextProvider>
      <Flex
        flex={1}
        backgroundColor="mono0"
        mt={safeArea ? (insets.top as FlexProps["mt"]) : 0}
        {...flexProps}
      >
        {children}

        <SafeAreaCover safeArea />
      </Flex>
    </ScreenScrollContextProvider>
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
      backgroundColor="mono0"
    />
  )
}

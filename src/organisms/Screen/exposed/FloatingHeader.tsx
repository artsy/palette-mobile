// import { BackButtonWithBackground, Flex, Spacer } from "@artsy/palette-mobile"
// import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { RawHeader } from "./RawHeader"
import { BackButtonWithBackground } from "../../../elements/BackButton"
import { Flex } from "../../../elements/Flex"
import { Spacer } from "../../../elements/Spacer"
import { useSetHandledTopSafeArea } from "../atoms"
import { NAVBAR_HEIGHT } from "../notExposed/ActualHeader"

export interface FloatingHeaderProps {
  onBack?: () => void
  rightElements?: React.ReactNode
}

export const FloatingHeader = ({ onBack, rightElements }: FloatingHeaderProps) => {
  // const navigation = useNavigation()
  useSetHandledTopSafeArea(false)
  const insets = useSafeAreaInsets()

  return (
    <RawHeader nosafe>
      <Flex
        position="absolute"
        pointerEvents="box-none"
        top={insets.top}
        left={0}
        right={0}
        height={NAVBAR_HEIGHT}
        px={1}
        flexDirection="row"
        alignItems="center"
      >
        <BackButtonWithBackground onPress={onBack ? onBack : () => navigation.goBack()} />
        <Flex flex={1} />

        {rightElements !== undefined && (
          <Flex flexDirection="row" alignItems="center">
            <Spacer x={1} />
            {rightElements}
          </Flex>
        )}
      </Flex>
    </RawHeader>
  )
}
FloatingHeader.defaultProps = { __TYPE: "screen:floating-header" }

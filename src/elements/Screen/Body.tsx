import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { Flex, FlexProps } from "../Flex"

export interface BodyProps extends FlexProps {
  fullwidth?: boolean
  safeArea?: boolean
  scroll?: boolean
}

export const Body: React.FC<BodyProps> = ({
  children,
  fullwidth,
  safeArea = true,
  scroll,
  ...flexProps
}) => {
  const insets = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Flex
        flex={1}
        mt={`${insets.top}px`}
        pb={safeArea ? `${insets.bottom}px` : undefined}
        {...flexProps}
      >
        <Flex flex={1} px={fullwidth ? undefined : SCREEN_HORIZONTAL_PADDING}>
          {scroll ? <ScrollView>{children}</ScrollView> : children}
        </Flex>
      </Flex>
    </KeyboardAvoidingView>
  )
}

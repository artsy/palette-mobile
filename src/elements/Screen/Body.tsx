import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { Flex, FlexProps } from "../Flex"

export interface BodyProps extends FlexProps {
  fullwidth?: boolean
  scroll?: boolean
}

export const Body: React.FC<BodyProps> = ({ children, fullwidth, scroll, ...flexProps }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Flex flex={1} {...flexProps}>
        <Flex flex={1} px={fullwidth ? undefined : SCREEN_HORIZONTAL_PADDING}>
          {scroll ? <ScrollView>{children}</ScrollView> : children}
        </Flex>
      </Flex>
    </KeyboardAvoidingView>
  )
}

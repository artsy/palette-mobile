import { KeyboardAvoidingView, ScrollView } from "react-native"
import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { Flex, FlexProps } from "../Flex"

export interface BodyProps extends FlexProps {
  fullwidth?: boolean
  scroll?: boolean
  disableKeyboardAvoidance?: boolean
}

export const Body: React.FC<BodyProps> = ({
  children,
  fullwidth,
  scroll,
  disableKeyboardAvoidance = false,
  ...flexProps
}) => {
  const Content = (
    <Flex flex={1} {...flexProps}>
      <Flex flex={1} px={fullwidth ? undefined : SCREEN_HORIZONTAL_PADDING}>
        {scroll ? <ScrollView>{children}</ScrollView> : children}
      </Flex>
    </Flex>
  )

  if (disableKeyboardAvoidance) {
    return Content
  }

  return <KeyboardAvoidingView>{Content}</KeyboardAvoidingView>
}

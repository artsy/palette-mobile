import { Fragment } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, type ScrollViewProps } from "react-native"
import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { Flex, FlexProps } from "../Flex"

export interface BodyProps extends FlexProps {
  fullwidth?: boolean
  scroll?: boolean
  disableKeyboardAvoidance?: boolean
  scrollViewProps?: ScrollViewProps
}

export const Body: React.FC<BodyProps> = ({
  children,
  fullwidth,
  scroll,
  disableKeyboardAvoidance = false,
  scrollViewProps,
  ...flexProps
}) => {
  const Wrapper = disableKeyboardAvoidance ? Fragment : KeyboardAvoidingView

  return (
    <Wrapper
      {...(disableKeyboardAvoidance
        ? {}
        : { style: { flex: 1 }, behavior: Platform.OS === "ios" ? "padding" : "height" })}
    >
      <Flex flex={1} {...flexProps}>
        <Flex flex={1} px={fullwidth ? undefined : SCREEN_HORIZONTAL_PADDING}>
          {scroll ? <ScrollView {...scrollViewProps}>{children}</ScrollView> : children}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

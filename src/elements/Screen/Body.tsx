import { Fragment } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, type ScrollViewProps } from "react-native"
import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { Flex, FlexProps } from "../Flex"

// Discriminated union: scrollViewProps only permitted when `scroll` is true
interface BodyBaseProps extends FlexProps {
  fullwidth?: boolean
  disableKeyboardAvoidance?: boolean
  children?: React.ReactNode
}

interface BodyScrollableProps extends BodyBaseProps {
  scroll: true
  scrollViewProps?: ScrollViewProps
}

interface BodyNonScrollableProps extends BodyBaseProps {
  scroll?: false | undefined
  // Prevent passing scrollViewProps when not scrolling
  scrollViewProps?: never
}

export type BodyProps = BodyScrollableProps | BodyNonScrollableProps

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

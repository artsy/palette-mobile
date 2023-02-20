import { getChildrenByType, removeChildrenByType } from "react-nanny"
import {
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
} from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BottomView } from "./BottomView"
import { LargeTitle } from "./LargeTitle"
import { Flex, FlexProps } from "../../../elements/Flex"
import { SpacingUnitDSValueNumber } from "../../../types"
import { Wrap } from "../../../utils/Wrap"
import { useSpace } from "../../../utils/hooks"
import {
  useHandledTopSafeArea,
  useScreenBottomViewHeight,
  useScreenTitleIsAnimated,
  useSetScreenIsFullWidthBody,
} from "../atoms"
import { useAnimatedHeaderScrolling } from "../hooks"

export const SCREEN_HORIZONTAL_PADDING: SpacingUnitDSValueNumber = 2

interface BodyProps extends Pick<FlexProps, "backgroundColor"> {
  children?: React.ReactNode
  scroll?: boolean
  nosafe?: boolean
  fullwidth?: boolean
}

export const Body = ({
  scroll = false,
  nosafe = false,
  fullwidth = false,
  children,
  ...restFlexProps
}: BodyProps) => {
  const space = useSpace()
  const childrenExceptBottomView = removeChildrenByType(children, BottomView)
  const bottomView = getChildrenByType(children, BottomView)
  const handledTopSafeArea = useHandledTopSafeArea()
  const bottomViewHeight = useScreenBottomViewHeight()
  const insets = useSafeAreaInsets()
  const withTopSafeArea = handledTopSafeArea
  const withBottomSafeArea = !nosafe

  useSetScreenIsFullWidthBody(fullwidth)

  const scrollOffsetY = useSharedValue(0)
  useAnimatedHeaderScrolling(scrollOffsetY)
  const usingAnimatedTitle = useScreenTitleIsAnimated()

  return (
    <>
      <Flex
        flex={1}
        mt={withTopSafeArea ? `${insets.top}px` : undefined}
        mb={withBottomSafeArea ? `${insets.bottom}px` : undefined}
        {...restFlexProps}
      >
        <Wrap if={scroll}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentInset={{ bottom: bottomViewHeight + space(2) }}
              scrollEventThrottle={0.0000000001}
              onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                scrollOffsetY.value = event.nativeEvent.contentOffset.y
              }}
            >
              {usingAnimatedTitle && <LargeTitle />}
              <Wrap.Content>
                <Flex flex={1} px={fullwidth ? undefined : SCREEN_HORIZONTAL_PADDING}>
                  {childrenExceptBottomView}
                </Flex>
                {!scroll && bottomView}
              </Wrap.Content>
            </ScrollView>
            {scroll && bottomView}
          </KeyboardAvoidingView>
        </Wrap>
      </Flex>
    </>
  )
}
Body.defaultProps = { __TYPE: "screen:body" }

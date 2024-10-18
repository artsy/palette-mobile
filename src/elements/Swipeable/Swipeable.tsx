import { forwardRef, useCallback } from "react"
import ReanimatedSwipeable, {
  SwipeableMethods,
  SwipeableRef,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import { SharedValue } from "react-native-reanimated"
import { Color } from "../../types"
import { Flex } from "../Flex"
import { Touchable } from "../Touchable"

export interface SwipeableProps {
  children: React.ReactNode
  actionOnPress: () => void
  actionCompoent: React.ReactNode
  actionBackground?: Color
  swipeableProps?: SwipeableProps
  enabled?: boolean
}

export const Swipeable = forwardRef((props: SwipeableProps, swipeableRef: SwipeableRef) => {
  const {
    children,
    actionOnPress,
    actionCompoent,
    actionBackground = "red100",
    enabled = true,
    swipeableProps,
  } = props

  const renderRightActions: (
    progress: SharedValue<number>,
    dragX: SharedValue<number>,
    swipable: SwipeableMethods
  ) => React.ReactNode = useCallback(() => {
    return (
      <Touchable onPress={actionOnPress}>
        <Flex
          ml={1}
          p={1}
          flex={1}
          minWidth={71}
          bg={actionBackground}
          alignItems="center"
          justifyContent="center"
        >
          {actionCompoent}
        </Flex>
      </Touchable>
    )
  }, [actionBackground, actionCompoent, actionOnPress])

  return (
    <ReanimatedSwipeable
      testID="swipeable-component"
      ref={swipeableRef}
      enabled={enabled}
      renderRightActions={renderRightActions}
      friction={1.5}
      {...swipeableProps}
    >
      {children}
    </ReanimatedSwipeable>
  )
})

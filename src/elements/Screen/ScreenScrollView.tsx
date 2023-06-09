import { flowRight } from "lodash"
import React from "react"
import { ScrollViewProps } from "react-native"
import Animated from "react-native-reanimated"
import { useListenForScreenScroll } from "./hooks/useListenForScreenScroll"

export const ScreenScrollView: React.FC<ScrollViewProps> = (props) => {
  const { scrollHandler } = useListenForScreenScroll()

  let handleScroll

  if (props.onScroll) {
    handleScroll = flowRight(scrollHandler, props.onScroll)
  } else {
    handleScroll = scrollHandler
  }

  return <Animated.ScrollView {...props} onScroll={handleScroll} scrollEventThrottle={16} />
}

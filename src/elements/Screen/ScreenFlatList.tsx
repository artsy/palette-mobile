import { flowRight } from "lodash"
import { FlatListProps } from "react-native"
import Animated from "react-native-reanimated"
import { useListenForScreenScroll } from "./hooks/useListenForScreenScroll"

export function ScreenFlatList<T>(props: FlatListProps<T>) {
  const { scrollHandler } = useListenForScreenScroll()

  let handleScroll

  if (props.onScroll) {
    handleScroll = flowRight(scrollHandler, props.onScroll)
  } else {
    handleScroll = scrollHandler
  }

  return <Animated.FlatList<T> {...props} onScroll={handleScroll} />
}

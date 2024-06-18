import { flowRight } from "lodash"
import { FlatListProps } from "react-native"
import Animated from "react-native-reanimated"
import { useListenForScreenScroll } from "./hooks/useListenForScreenScroll"

export type ScreenFlatListProps<T> = FlatListProps<T> & {
  innerRef?: React.Ref<Animated.FlatList<T>>
}

export function ScreenFlatList<T>(props: ScreenFlatListProps<T>) {
  const { scrollHandler } = useListenForScreenScroll()

  let handleScroll

  if (props.onScroll) {
    handleScroll = flowRight(scrollHandler, props.onScroll)
  } else {
    handleScroll = scrollHandler
  }

  return <Animated.FlatList ref={props.innerRef} {...props} onScroll={handleScroll} />
}

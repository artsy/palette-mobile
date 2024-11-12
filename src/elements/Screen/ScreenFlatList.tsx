import { flowRight } from "lodash"
import { FlatList, FlatListProps } from "react-native"
import Animated from "react-native-reanimated"
import { useListenForScreenScroll } from "./hooks/useListenForScreenScroll"

export type ScreenFlatListProps<T> = Omit<FlatListProps<T>, "CellRendererComponent"> & {
  innerRef?: React.ForwardedRef<FlatList<T>>
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

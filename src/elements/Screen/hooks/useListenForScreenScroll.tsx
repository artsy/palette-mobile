import { useAnimatedScrollHandler } from "react-native-reanimated"
import { useScreenScrollContext } from "../ScreenScrollContext"

export const useListenForScreenScroll = () => {
  const { currentScrollYAnimated, scrollViewDimensionsAnimated } = useScreenScrollContext()

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      currentScrollYAnimated.set(() => event.contentOffset.y)
      scrollViewDimensionsAnimated.set(() => event.contentSize.height)
    },
  })

  return {
    scrollHandler,
  }
}

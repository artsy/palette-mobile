import { useEffect } from "react"
import { useAnimatedScrollHandler } from "react-native-reanimated"
import { useAnimatedHeaderScrolling } from "./useAnimatedHeaderScrolling"
import { useScreenScrollContext } from "../ScreenScrollContext"

export const useListenForScreenScroll = () => {
  const {
    updateCurrentScrollY,
    scrollYOffset,
    currentScrollYAnimated,
    scrollViewDimensionsAnimated,
  } = useScreenScrollContext()
  const scrollY = useAnimatedHeaderScrolling(currentScrollYAnimated, scrollYOffset)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      currentScrollYAnimated.set(() => event.contentOffset.y)
      scrollViewDimensionsAnimated.set(() => event.contentSize.height)
    },
  })

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])

  return {
    scrollHandler,
  }
}

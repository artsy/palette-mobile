import { useEffect } from "react"
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { useAnimatedHeaderScrolling } from "./useAnimatedHeaderScrolling"
import { useScreenScrollContext } from "../ScreenScrollContext"

export const useListenForScreenScroll = () => {
  const { updateCurrentScrollY, scrollYOffset } = useScreenScrollContext()
  const animatedScrollY = useSharedValue(0)
  const scrollY = useAnimatedHeaderScrolling(animatedScrollY, scrollYOffset)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedScrollY.set(() => event.contentOffset.y)
    },
  })

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])

  return {
    scrollHandler,
  }
}

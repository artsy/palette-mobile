import { useEffect } from "react"
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { useAnimatedHeaderScrolling } from "./useAnimatedHeaderScrolling"
import { useScreenScrollContext } from "../ScreenScrollContext"

export const useListenForScreenScroll = () => {
  const { updateCurrentScrollY, scrollYDetectionOffset } = useScreenScrollContext()
  const animatedScrollY = useSharedValue(0)
  const scrollY = useAnimatedHeaderScrolling(animatedScrollY, scrollYDetectionOffset)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedScrollY.value = event.contentOffset.y
    },
  })

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])

  return {
    scrollHandler,
  }
}

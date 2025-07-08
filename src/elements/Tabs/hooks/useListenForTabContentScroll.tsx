import { useEffect } from "react"
import { useCurrentTabScrollY } from "react-native-collapsible-tab-view"
import { useAnimatedReaction } from "react-native-reanimated"
import { useScreenScrollContext } from "../../Screen/ScreenScrollContext"
import { useAnimatedHeaderScrolling } from "../../Screen/hooks/useAnimatedHeaderScrolling"

export const useListenForTabContentScroll = () => {
  // TODO: move away from JS variables, use the animated values instead
  const { updateCurrentScrollY, scrollYOffset, currentScrollYAnimated } = useScreenScrollContext()
  const currentTabScrollY = useCurrentTabScrollY()
  const scrollY = useAnimatedHeaderScrolling(currentTabScrollY, scrollYOffset)

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])

  useAnimatedReaction(
    () => currentTabScrollY.value,
    (current) => {
      currentScrollYAnimated?.set(current)
    }
  )
}

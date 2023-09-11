import { useEffect } from "react"
import { useCurrentTabScrollY } from "react-native-collapsible-tab-view"
import { useScreenScrollContext } from "../../Screen/ScreenScrollContext"
import { useAnimatedHeaderScrolling } from "../../Screen/hooks/useAnimatedHeaderScrolling"

export const useListenForTabContentScroll = () => {
  const { updateCurrentScrollY, scrollYOffset } = useScreenScrollContext()
  const scrollY = useAnimatedHeaderScrolling(useCurrentTabScrollY(), scrollYOffset)

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])
}

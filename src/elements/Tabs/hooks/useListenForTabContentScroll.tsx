import { useEffect } from "react"
import { useCurrentTabScrollY } from "react-native-collapsible-tab-view"
import { useScreenScrollContext } from "../../Screen/ScreenScrollContext"
import { useAnimatedHeaderScrolling } from "../../Screen/hooks/useAnimatedHeaderScrolling"

export const useListenForTabContentScroll = () => {
  const { updateCurrentScrollY, scrollYDetectionOffset } = useScreenScrollContext()
  const scrollY = useAnimatedHeaderScrolling(useCurrentTabScrollY(), scrollYDetectionOffset)

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])
}

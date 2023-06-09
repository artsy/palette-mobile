import { useEffect } from "react"
import { useCurrentTabScrollY } from "react-native-collapsible-tab-view"
import { useScreenScrollContext } from "../../Screen/ScreenScrollContext"
import { useAnimatedHeaderScrolling } from "../../Screen/hooks/useAnimatedHeaderScrolling"

export const useListenForTabContentScroll = () => {
  const scrollY = useAnimatedHeaderScrolling(useCurrentTabScrollY())
  const { updateCurrentScrollY } = useScreenScrollContext()

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])
}

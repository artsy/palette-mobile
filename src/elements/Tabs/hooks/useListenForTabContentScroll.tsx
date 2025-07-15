import { useCurrentTabScrollY } from "react-native-collapsible-tab-view"
import { useAnimatedReaction } from "react-native-reanimated"
import { useScreenScrollContext } from "../../Screen/ScreenScrollContext"

export const useListenForTabContentScroll = () => {
  const { currentScrollYAnimated } = useScreenScrollContext()
  const currentTabScrollY = useCurrentTabScrollY()

  useAnimatedReaction(
    () => currentTabScrollY.value,
    // TODO: improve the conditions here
    (current) => {
      currentScrollYAnimated?.set(current)
    }
  )
}

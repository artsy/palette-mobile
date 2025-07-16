import { Dimensions } from "react-native"
import { useDerivedValue } from "react-native-reanimated"
import { useScreenScrollContext } from "../ScreenScrollContext"
import { BOTTOM_TABS_HEIGHT, STICKY_BAR_HEIGHT } from "../StickySubHeader"
import { NAVBAR_HEIGHT } from "../constants"

export const useShowLargeTitle = ({ stickyBarHeight }: { stickyBarHeight: number | null }) => {
  const {
    scrollYOffset = 0,
    currentScrollYAnimated,
    scrollViewDimensionsAnimated,
  } = useScreenScrollContext()

  const { height: screenHeight } = Dimensions.get("window")

  const scrollViewContentHeight =
    screenHeight - NAVBAR_HEIGHT - STICKY_BAR_HEIGHT - BOTTOM_TABS_HEIGHT

  const visible = useDerivedValue(() => {
    // We show the big title if
    if (
      // We are still not yet done computing its height
      stickyBarHeight === null ||
      // The user didn't scroll yet
      currentScrollYAnimated === null ||
      // The user is scrolling on a screen that is too small to show the small header
      scrollViewDimensionsAnimated?.value < scrollViewContentHeight
    ) {
      return true
    }

    if (currentScrollYAnimated?.value < 0) {
      return true
    }

    return currentScrollYAnimated.value < NAVBAR_HEIGHT + scrollYOffset
  }, [scrollYOffset, stickyBarHeight, currentScrollYAnimated])

  return {
    visible,
  }
}

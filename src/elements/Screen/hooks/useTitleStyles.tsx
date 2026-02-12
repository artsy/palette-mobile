import { useDerivedValue } from "react-native-reanimated"
import { useScreenScrollContext } from "../ScreenScrollContext"
import { NAVBAR_HEIGHT } from "../constants"

export const useTitleStyles = () => {
  const { scrollYOffsetAnimated, currentScrollYAnimated } = useScreenScrollContext()

  // Show / hide the title to avoid rerenders, which retrigger the animation
  const display = useDerivedValue(() => {
    return currentScrollYAnimated.value < NAVBAR_HEIGHT + scrollYOffsetAnimated?.value || 0
      ? "none"
      : "flex"
  }, [currentScrollYAnimated, scrollYOffsetAnimated])

  const opacity = useDerivedValue(() => {
    return display.value === "flex" ? 1 : 0
  })

  return {
    display,
    opacity,
  }
}

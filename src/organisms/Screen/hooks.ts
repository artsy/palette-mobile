// import { useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { runOnJS, SharedValue, useAnimatedReaction, useSharedValue } from "react-native-reanimated"
import { useAnimatedTitleSmallTitleShownSetter } from "./atoms"

export function useAnimatedHeaderScrolling(scrollY: SharedValue<number>, useHack = false) {
  const setTitleShown = useAnimatedTitleSmallTitleShownSetter()
  const careAboutScrolling = useSharedValue(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      careAboutScrolling.value = false
    }, 1 /* sec */ * 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useAnimatedReaction(
    () => [scrollY.value, careAboutScrolling.value] as const,
    ([data, care], prevDataTuple) => {
      const [prevData] = prevDataTuple ?? [0, false]

      // hacky way to avoid some weird header behavior.
      // look at HACKS.md for more info.
      const suddenlyScrolled = Math.abs(data - prevData) > 40
      if (useHack && care && suddenlyScrolled) return

      // don't trigger the toggle function if the value we call it with hasn't changed
      const prevTitleShown = (prevData ?? 0) > 30
      const currTitleShown = (data ?? 0) > 30
      if (prevTitleShown === currTitleShown) return

      runOnJS(setTitleShown)(data > 30)
    },
    [scrollY]
  )
}

export const useScreenName = (): string => {
  // const { name: screenName } = useRoute()
  // return screenName
  return "wow"
}

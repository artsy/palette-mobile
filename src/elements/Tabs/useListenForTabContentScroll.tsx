import { useEffect, useState } from "react"
import { useCurrentTabScrollY } from "react-native-collapsible-tab-view"
import { runOnJS, SharedValue, useAnimatedReaction, useSharedValue } from "react-native-reanimated"
import { useTabsContext } from "./TabsContext"
import { NAVBAR_HEIGHT } from "../Screen/constants"

export const useListenForTabContentScroll = () => {
  const scrollY = useAnimatedTabsHeaderScrolling(useCurrentTabScrollY())
  const { updateCurrentScrollY } = useTabsContext()

  useEffect(() => {
    updateCurrentScrollY(scrollY)
  }, [scrollY, updateCurrentScrollY])
}

const useAnimatedTabsHeaderScrolling = (scrollY: SharedValue<number>) => {
  const listenForScroll = useSharedValue(true)
  const [currScrollY, setCurrScrollY] = useState(scrollY.value)

  // Needed to run on JS thread
  const update = (y: number) => {
    setCurrScrollY(y)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      listenForScroll.value = false
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [listenForScroll])

  useAnimatedReaction(
    () => {
      "worklet"

      return [scrollY.value, listenForScroll.value] as const
    },
    ([animatedScrollY, isListeningForScroll], previousScroll) => {
      "worklet"

      const [prevScrollY] = previousScroll ?? [0, false]

      // Hacky way to avoid some weird header behavior.
      // look at HACKS.md for more info.
      const suddenlyScrolled = Math.abs(animatedScrollY - prevScrollY) > NAVBAR_HEIGHT

      if (isListeningForScroll && suddenlyScrolled) {
        return
      }

      const prevTitleShown = prevScrollY >= NAVBAR_HEIGHT
      const currTitleShown = animatedScrollY >= NAVBAR_HEIGHT

      if (prevTitleShown === currTitleShown) {
        return
      }

      runOnJS(update)(Math.floor(animatedScrollY))
    },
    [scrollY]
  )

  return currScrollY
}

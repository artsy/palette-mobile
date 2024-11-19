import { useEffect, useMemo, useState } from "react"
import { runOnJS, SharedValue, useAnimatedReaction, useSharedValue } from "react-native-reanimated"
import { NAVBAR_HEIGHT } from "../constants"

export const useAnimatedHeaderScrolling = (scrollY: SharedValue<number>, scrollYOffset = 0) => {
  const listenForScroll = useSharedValue(true)
  const [currScrollY, setCurrScrollY] = useState(scrollY.value)
  const HEADER_HEIGHT = useMemo(() => NAVBAR_HEIGHT + scrollYOffset, [scrollYOffset])

  // Needed to run on JS thread
  const update = (y: number) => {
    setCurrScrollY(y)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      listenForScroll.set(() => false)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [listenForScroll.get()])

  useAnimatedReaction(
    () => {
      return [scrollY.value, listenForScroll.get()] as const
    },
    ([animatedScrollY, isListeningForScroll], previousScroll) => {
      const [prevScrollY] = previousScroll ?? [0, false]

      // Hacky way to avoid some weird header behavior.
      // look at HACKS.md for more info.
      const suddenlyScrolled = Math.abs(animatedScrollY - prevScrollY) > HEADER_HEIGHT

      if (isListeningForScroll && suddenlyScrolled) {
        return
      }

      const prevTitleShown = prevScrollY >= HEADER_HEIGHT
      const currTitleShown = animatedScrollY >= HEADER_HEIGHT

      if (prevTitleShown === currTitleShown) {
        return
      }

      runOnJS(update)(Math.floor(animatedScrollY))
    },
    [scrollY, HEADER_HEIGHT]
  )

  return currScrollY
}

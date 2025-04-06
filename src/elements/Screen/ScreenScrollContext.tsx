import { useContext, createContext, useState } from "react"
import { SharedValue, useSharedValue } from "react-native-reanimated"
export interface ScreenScrollContextProps {
  currentScrollYAnimated: SharedValue<number>
  currentScrollY: number
  updateCurrentScrollY: (scrollY: number) => void
  // used by the hooks when measuring the scroll position in a more granular way
  scrollYOffset?: number
  scrollViewDimensionsAnimated: SharedValue<number>
  updateScrollYOffset: (offset: number) => void
}

const ScreenScrollContext = createContext<ScreenScrollContextProps>({
  // Casting this value as ShareValue because we set it to useSharedValue(0) on Mount
  currentScrollYAnimated: null as unknown as SharedValue<number>,
  currentScrollY: 0,
  updateCurrentScrollY: () => {},
  scrollYOffset: undefined,
  // Casting this value as ShareValue because we set it to useSharedValue(0) on Mount
  scrollViewDimensionsAnimated: null as unknown as SharedValue<number>,
  updateScrollYOffset: () => {},
})

export const ScreenScrollContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [scrollYOffset, setScrollYOffset] =
    useState<ScreenScrollContextProps["scrollYOffset"]>(undefined)

  const currentScrollYAnimated = useSharedValue(0)
  const scrollViewDimensionsAnimated = useSharedValue(0)

  const providerValue = {
    currentScrollYAnimated,
    currentScrollY,
    scrollYOffset,
    scrollViewDimensionsAnimated,
    updateCurrentScrollY: (scrollY: number) => {
      setCurrentScrollY(scrollY)
    },
    updateScrollYOffset: (yOffset: number) => {
      setScrollYOffset(yOffset)
    },
  }

  return (
    <ScreenScrollContext.Provider value={providerValue}>{children}</ScreenScrollContext.Provider>
  )
}

export const useScreenScrollContext = () => {
  const context = useContext(ScreenScrollContext)

  if (!context) {
    throw new Error(
      "useScreenScrollContext must be used within a Screen.ScreenScrollContextProvider component"
    )
  }

  return context
}

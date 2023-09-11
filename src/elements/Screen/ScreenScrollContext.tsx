import { useContext, createContext, useState } from "react"

export interface ScreenScrollContextProps {
  currentScrollY: number
  updateCurrentScrollY: (scrollY: number) => void
  // used by the hooks when measuring the scroll position in a more granular way
  scrollYDetectionOffset?: number
  updateScrollYDetectionOffset: (offset: number) => void
}

const ScreenScrollContext = createContext<ScreenScrollContextProps>({
  currentScrollY: 0,
  updateCurrentScrollY: () => {},
  scrollYDetectionOffset: undefined,
  updateScrollYDetectionOffset: () => {},
})

export const ScreenScrollContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [scrollYDetectionOffset, setScrollYDetectionOffset] =
    useState<ScreenScrollContextProps["scrollYDetectionOffset"]>(undefined)

  const providerValue = {
    currentScrollY,
    scrollYDetectionOffset,
    updateCurrentScrollY: (scrollY: number) => {
      setCurrentScrollY(scrollY)
    },
    updateScrollYDetectionOffset: (scrollYDetectionOffset: number) => {
      setScrollYDetectionOffset(scrollYDetectionOffset)
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

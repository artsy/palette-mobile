import { useContext, createContext, useState } from "react"

export interface ScreenScrollContextProps {
  currentScrollY: number
  updateCurrentScrollY: (scrollY: number) => void
  // used by the hooks when measuring the scroll position in a more granular way
  scrollYOffset?: number
  updateScrollYOffset: (offset: number) => void
}

const ScreenScrollContext = createContext<ScreenScrollContextProps>({
  currentScrollY: 0,
  updateCurrentScrollY: () => {},
  scrollYOffset: undefined,
  updateScrollYOffset: () => {},
})

export const ScreenScrollContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [scrollYOffset, setScrollYOffset] =
    useState<ScreenScrollContextProps["scrollYOffset"]>(undefined)

  const providerValue = {
    currentScrollY,
    scrollYOffset,
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

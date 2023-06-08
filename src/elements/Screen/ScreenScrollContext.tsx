import { useContext, createContext, useState } from "react"

export interface ScreenScrollContextProps {
  currentScrollY: number
  updateCurrentScrollY: (scrollY: number) => void
}

const ScreenScrollContext = createContext<ScreenScrollContextProps>({
  currentScrollY: 0,
  updateCurrentScrollY: () => {},
})

export const ScreenScrollContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentScrollY, setCurrentScrollY] = useState(0)

  const providerValue = {
    currentScrollY,
    updateCurrentScrollY: (scrollY: number) => {
      setCurrentScrollY(scrollY)
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

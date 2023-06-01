import { useContext, createContext, useState } from "react"

export interface TabsContextProps {
  currentScrollY: number
  updateCurrentScrollY: (scrollY: number) => void
}

const TabsContext = createContext<TabsContextProps>({
  currentScrollY: 0,
  updateCurrentScrollY: () => {},
})

export const TabsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentScrollY, setCurrentScrollY] = useState(0)

  const providerValue = {
    currentScrollY,
    updateCurrentScrollY: (scrollY: number) => {
      setCurrentScrollY(scrollY)
    },
  }

  return <TabsContext.Provider value={providerValue}>{children}</TabsContext.Provider>
}

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error("useTabsContext must be used within a Tabs.TabsProvider component")
  }

  return context
}

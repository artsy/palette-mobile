import { createContext, useContext, useState, useCallback, ReactNode } from "react"

// Context for SubTabBar content management
interface SubTabBarContextValue {
  subTabBars: Record<string, ReactNode>
  activeTabName: string | null
  setSubTabBar: (tabName: string, content: ReactNode | null) => void
  setActiveTabName: (tabName: string | null) => void
}

const SubTabBarContext = createContext<SubTabBarContextValue | null>(null)

export const SubTabBarProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [subTabBars, setSubTabBars] = useState<Record<string, ReactNode>>({})
  const [activeTabName, setActiveTabName] = useState<string | null>(null)

  const setSubTabBar = useCallback((tabName: string, content: ReactNode | null) => {
    setSubTabBars((prev) => {
      if (content === null) {
        const { [tabName]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [tabName]: content }
    })
  }, [])

  return (
    <SubTabBarContext.Provider
      value={{ subTabBars, activeTabName, setSubTabBar, setActiveTabName }}
    >
      {children}
    </SubTabBarContext.Provider>
  )
}

export const useSubTabBarContext = () => {
  const context = useContext(SubTabBarContext)
  if (!context) {
    throw new Error("useSubTabBarContext must be used within a SubTabBarProvider")
  }
  return context
}

// Context for providing tab name to children
const TabNameContext = createContext<string | null>(null)

export const TabNameProvider = TabNameContext.Provider

export const useTabName = () => {
  const tabName = useContext(TabNameContext)
  if (!tabName) {
    throw new Error("useTabName must be used within a Tab component")
  }
  return tabName
}

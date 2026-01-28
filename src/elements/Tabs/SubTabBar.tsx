import { useEffect } from "react"
import { useSubTabBarContext, useTabName } from "./SubTabBarContext"

/**
 * Use to position content directly below the tab bar, and for it to stick while
 * scrolling in the subview.
 *
 * Useful for views where subcontent has a secondary filter or navigation.
 *
 * This component renders nothing itself - it registers its children in the context
 * under the parent tab's name, so TabsContainer can render the active tab's SubTabBar.
 *
 * Must be used inside a Tabs.Tab component.
 */
export const SubTabBar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const tabName = useTabName()
  const { setSubTabBar } = useSubTabBarContext()

  useEffect(() => {
    setSubTabBar(tabName, children)

    return () => {
      setSubTabBar(tabName, null)
    }
  }, [tabName, children, setSubTabBar])

  return null
}

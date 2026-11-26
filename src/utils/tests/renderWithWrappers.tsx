import { render } from "@testing-library/react-native"
import { ReactElement } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Theme } from "../../Theme"

/**
 * Renders a React Component with our page wrappers
 * by using @testing-library/react-native
 * @param component
 */
export const renderWithWrappers = (component: ReactElement) => {
  return render(component, { wrapper: Providers })
}

export const Providers = ({ children }: { children?: React.ReactNode }) => (
  <SafeAreaProvider>
    <Theme>{children}</Theme>
  </SafeAreaProvider>
)

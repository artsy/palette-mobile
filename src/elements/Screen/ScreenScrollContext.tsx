import { createContext, useContext } from "react"
import { SharedValue, useSharedValue } from "react-native-reanimated"
export interface ScreenScrollContextProps {
  currentScrollYAnimated: SharedValue<number>
  scrollYOffsetAnimated: SharedValue<number>
  scrollViewDimensionsAnimated: SharedValue<number>
}

const ScreenScrollContext = createContext<ScreenScrollContextProps>({
  // Casting this value as ShareValue because we set it to useSharedValue(0) on Mount
  currentScrollYAnimated: null as unknown as SharedValue<number>,
  scrollYOffsetAnimated: null,
  // Casting this value as ShareValue because we set it to useSharedValue(0) on Mount
  scrollViewDimensionsAnimated: null as unknown as SharedValue<number>,
})

export const ScreenScrollContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const currentScrollYAnimated = useSharedValue(0)
  const scrollViewDimensionsAnimated = useSharedValue(0)
  const scrollYOffsetAnimated = useSharedValue(0)

  const providerValue = {
    currentScrollYAnimated,
    scrollYOffsetAnimated,
    scrollViewDimensionsAnimated,
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

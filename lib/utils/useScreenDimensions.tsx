import { createContext, useContext, useEffect, useState } from "react"
import { ScaledSize, useWindowDimensions } from "react-native"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"

export type ScreenOrientation = "landscape" | "portrait"

export type SafeAreaInsets = EdgeInsets

export interface ScreenDimensions extends ScaledSize {
  orientation: ScreenOrientation
  size: "small" | "standard" | "large"
  isSmallScreen: boolean
  safeAreaInsets: SafeAreaInsets
}

export const ScreenDimensionsProvider = ({ children }: { children: React.ReactNode }) => {
  const safeAreaInsets = useSafeAreaInsets()
  const dimensions = useWindowDimensions()

  const orientation = dimensions.width > dimensions.height ? "landscape" : "portrait"
  const size = dimensions.height < 667 ? "small" : dimensions.height <= 812 ? "standard" : "large"
  const isSmallScreen = size === "small"

  return (
    <ScreenDimensionsContext.Provider
      value={{
        ...dimensions,
        safeAreaInsets,
        orientation,
        size,
        isSmallScreen,
      }}
    >
      {children}
    </ScreenDimensionsContext.Provider>
  )
}

const ScreenDimensionsContext = createContext<ScreenDimensions>(null!)
export function useScreenDimensions() {
  const context = useContext(ScreenDimensionsContext)
  if (!context) {
    throw new Error("useScreenDimensions must be used within a ScreenDimensionsProvider")
  }
  return context
}

/**
 * The following components have slightly different sizing dimensions based on the iPhone model
 * This file passes in the correct values based on the screen size
 *
 * Large:
 * iPhone XS Max/iphone XR: screenSize = 896
 *
 * Small:
 * iphone SE/iphone 5s: screenSize = 568
 *
 * Standard:
 * iPhone X/iphone XS: screenSize = 812
 * iPhone 6/iPhone 6 Plus/iPhone 6s/iPhone 6s Plus/iPhone 7/iphone 8/iphone 8 Plus: screenSize = 667
 */

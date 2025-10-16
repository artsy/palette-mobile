import { PixelRatio } from "react-native"

/**
 * Touch area box for UI elements
 */
export const DEFAULT_HIT_SLOP = { top: 20, bottom: 20, left: 20, right: 20 }

export const DEFAULT_ICON_SIZE = 24 * PixelRatio.getFontScale()

/**
 * Default active opacity for elements that use Palette's <Touchable />
 */
export let DEFAULT_ACTIVE_OPACITY = 0.8

// Set things globally
export const setGlobalActiveOpacity = (opacity: number) => {
  DEFAULT_ACTIVE_OPACITY = opacity
}

// Check if the global `nativeFabric` object exists.
// Its presence indicates that Fabric is running.
// nativeFabricUIManager is only available in the new architecture and isn't typed yet
export const isNewArchitectureEnabled = !!global?.nativeFabricUIManager

export const DEFAULT_ANIMATION_DURATION = 200

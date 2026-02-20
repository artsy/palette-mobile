import { PixelRatio } from "react-native"

/**
 * Touch area box for UI elements
 */
export const DEFAULT_HIT_SLOP = { top: 20, bottom: 20, left: 20, right: 20 }

export const DEFAULT_ICON_SIZE = 24 * PixelRatio.getFontScale()
export const DEFAULT_ICON_SIZE_SMALL = 16 * PixelRatio.getFontScale()

/**
 * Default active opacity for elements that use Palette's <Touchable />
 */
export let DEFAULT_ACTIVE_OPACITY = 0.8

// Set things globally
export const setGlobalActiveOpacity = (opacity: number) => {
  DEFAULT_ACTIVE_OPACITY = opacity
}

export const DEFAULT_ANIMATION_DURATION = 200

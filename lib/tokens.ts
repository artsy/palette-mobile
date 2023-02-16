/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 * https://www.figma.com/file/gZNkyqLT8AU3T61tluVJyB/Artsy-3.1-Design-System
 */

import { THEME_V3 } from "@artsy/palette-tokens"
import { SpacingUnit as SpacingUnitV3Numbers } from "@artsy/palette-tokens/dist/themes/v3"
import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { Color, Colors, SpacingUnit } from "./types"
import {
  convertWebSpacingUnitsToMobile,
  convertWebTextTreatmentsToMobile,
  TextTreatmentWithoutUnits,
} from "./utils/webTokensToMobile"

const { textVariants, space, colors, fonts } = THEME_V3

export const mobileTokens = {
  textVariants,
  space,
  colors,
  fonts,
}

export interface ThemeType {
  space: Record<SpacingUnitV3Numbers, `${number}px`>
  colors: Record<Colors, string>
  fonts: { sans: { regular: string; italic: string; medium: string; mediumItalic: string } }
  textTreatments: Record<TextVariant, TextTreatmentWithoutUnits>
}

export interface ThemeWithDarkModeType extends ThemeType {
  colors: Record<Colors, string>
}

export type Themes = ThemeType & ThemeWithDarkModeType

// These are for styled-system
export type SpacingUnitsTheme = { space: Record<SpacingUnit, any> }
export type ColorsTheme = { colors: Record<Color, any> }

export const ADDITIONAL_COLOR_LAYERS = {
  background: mobileTokens.colors.white100,
  onBackground: mobileTokens.colors.black100,
  onBackgroundHigh: mobileTokens.colors.black100,
  onBackgroundMedium: mobileTokens.colors.black60,
  onBackgroundLow: mobileTokens.colors.black30,
  surface: mobileTokens.colors.white100,
  onSurface: mobileTokens.colors.black100,
  onSurfaceHigh: mobileTokens.colors.black100,
  onSurfaceMedium: mobileTokens.colors.black60,
  onSurfaceLow: mobileTokens.colors.black5,
  primary: mobileTokens.colors.black100,
  onPrimaryHigh: mobileTokens.colors.white100,
  onPrimaryMedium: mobileTokens.colors.black5,
  onPrimaryLow: mobileTokens.colors.black5,
  secondary: mobileTokens.colors.black30,
  onSecondaryHigh: mobileTokens.colors.black100,
  onSecondaryMedium: mobileTokens.colors.black60,
  onSecondaryLow: mobileTokens.colors.black60,
  brand: mobileTokens.colors.blue100,
  onBrand: mobileTokens.colors.white100,
  devpurple: "#6E1EFF",
}

const THEME = {
  ...mobileTokens,
  colors: {
    ...mobileTokens.colors,
    ...ADDITIONAL_COLOR_LAYERS,
  },
  space: convertWebSpacingUnitsToMobile(mobileTokens.space),
  textTreatments: convertWebTextTreatmentsToMobile(mobileTokens.textVariants),
  fonts: {
    sans: {
      regular: "Unica77LL-Regular",
      italic: "Unica77LL-Italic",
      medium: "Unica77LL-Medium",
      mediumItalic: "Unica77LL-MediumItalic",
    },
  },
}

const THEME_LIGHT = THEME

const THEME_DARK = {
  ...THEME,
  colors: {
    ...THEME.colors,
    background: mobileTokens.colors.black100,
    onBackground: mobileTokens.colors.white100,
    onBackgroundHigh: mobileTokens.colors.white100,
    onBackgroundMedium: mobileTokens.colors.black30,
    onBackgroundLow: mobileTokens.colors.black60,
    surface: "#333",
    onSurface: mobileTokens.colors.white100,
    onSurfaceHigh: mobileTokens.colors.white100,
    onSurfaceMedium: mobileTokens.colors.black60,
    onSurfaceLow: "#555",
    primary: mobileTokens.colors.white100,
    onPrimaryHigh: mobileTokens.colors.black100,
    onPrimaryMedium: mobileTokens.colors.black60,
    onPrimaryLow: mobileTokens.colors.black60,
    secondary: mobileTokens.colors.black60,
    onSecondaryHigh: mobileTokens.colors.white100,
    onSecondaryMedium: mobileTokens.colors.black5,
    onSecondaryLow: mobileTokens.colors.black5,
    brand: mobileTokens.colors.blue100,
    onBrand: mobileTokens.colors.white100,
  },
}

export const THEMES: {
  v3: ThemeType
  v3light: ThemeWithDarkModeType
  v3dark: ThemeWithDarkModeType
} = {
  v3: THEME,
  v3light: THEME_LIGHT,
  v3dark: THEME_DARK,
}

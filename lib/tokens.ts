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
  background: THEME_V3.colors.white100,
  onBackground: THEME_V3.colors.black100,
  onBackgroundHigh: THEME_V3.colors.black100,
  onBackgroundMedium: THEME_V3.colors.black60,
  onBackgroundLow: THEME_V3.colors.black30,
  surface: THEME_V3.colors.white100,
  onSurface: THEME_V3.colors.black100,
  onSurfaceHigh: THEME_V3.colors.black100,
  onSurfaceMedium: THEME_V3.colors.black60,
  onSurfaceLow: THEME_V3.colors.black5,
  primary: THEME_V3.colors.black100,
  onPrimaryHigh: THEME_V3.colors.white100,
  onPrimaryMedium: THEME_V3.colors.black5,
  onPrimaryLow: THEME_V3.colors.black5,
  secondary: THEME_V3.colors.black30,
  onSecondaryHigh: THEME_V3.colors.black100,
  onSecondaryMedium: THEME_V3.colors.black60,
  onSecondaryLow: THEME_V3.colors.black60,
  brand: THEME_V3.colors.blue100,
  onBrand: THEME_V3.colors.white100,
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
    background: THEME.colors.black100,
    onBackground: THEME.colors.white100,
    onBackgroundHigh: THEME.colors.white100,
    onBackgroundMedium: THEME.colors.black30,
    onBackgroundLow: THEME.colors.black60,
    surface: "#333",
    onSurface: THEME.colors.white100,
    onSurfaceHigh: THEME.colors.white100,
    onSurfaceMedium: THEME.colors.black60,
    onSurfaceLow: "#555",
    primary: THEME.colors.white100,
    onPrimaryHigh: THEME.colors.black100,
    onPrimaryMedium: THEME.colors.black60,
    onPrimaryLow: THEME.colors.black60,
    secondary: THEME.colors.black60,
    onSecondaryHigh: THEME.colors.white100,
    onSecondaryMedium: THEME.colors.black5,
    onSecondaryLow: THEME.colors.black5,
    brand: THEME.colors.blue100,
    onBrand: THEME.colors.white100,
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

/**
 * All of the config for the Artsy theming system are based on the
 * on tokens from palette
 */

import { THEME } from "@artsy/palette-tokens"
import { SpacingUnit as SpacingUnitNumbers } from "@artsy/palette-tokens/dist/themes/v3"
import { THEME_DARK } from "@artsy/palette-tokens/dist/themes/v3Dark"
import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { Color, ColorDSValue, ColorLayerName, SpacingUnit } from "./types"
import {
  convertWebSpacingUnitsToMobile,
  convertWebTextTreatmentsToMobile,
  TextTreatmentWithoutUnits,
} from "./utils/webTokensToMobile"

const { textVariants, space, colors } = THEME

export interface ThemeType {
  space: Record<SpacingUnitNumbers, `${number}px`>
  colors: Record<ColorLayerName, string>
  fonts: { sans: { regular: string; italic: string; medium: string; mediumItalic: string } }
  textTreatments: Record<TextVariant, TextTreatmentWithoutUnits>
}

export interface ThemeWithDarkModeType extends ThemeType {
  colors: Record<ColorDSValue, string>
}

export type AllThemesType = ThemeType & ThemeWithDarkModeType

// These are for styled-system
export type SpacingUnitsTheme = { space: Record<SpacingUnit, any> }
export type ColorsTheme = { colors: Record<Color, any> }

export const COLOR_LAYER_NAME = {
  ...colors,
  /** Adding this here for dev usage. Avoid using it for actual components. */
  devpurple: "#6E1EFF",
}

export const COLOR_LAYER_ROLE = [
  // name: Anything big/surface: background, cards, button fills, etc.
  // onName: Anything small, texts, icons, etc.
  // onNameContrast: Anything small, texts, icons, etc based on contrast.
  "background",
  "onBackground", // same as onBackgroundHigh
  "onBackgroundHigh",
  "onBackgroundMedium",
  "onBackgroundLow",
  "surface",
  "onSurface", // same as onSurfaceHigh
  "onSurfaceHigh",
  "onSurfaceMedium",
  "onSurfaceLow",
  "primary",
  "onPrimaryHigh",
  "onPrimaryMedium",
  "onPrimaryLow",
  "secondary",
  "onSecondaryHigh",
  "onSecondaryMedium",
  "onSecondaryLow",
  "brand",
  "onBrand",
] as const

const v3: ThemeType = {
  space: convertWebSpacingUnitsToMobile(space),
  colors: COLOR_LAYER_NAME,
  fonts: {
    sans: {
      regular: "Unica77LL-Regular",
      italic: "Unica77LL-Italic",
      medium: "Unica77LL-Medium",
      mediumItalic: "Unica77LL-MediumItalic",
    },
  },
  textTreatments: convertWebTextTreatmentsToMobile(textVariants),
}

const v3light: ThemeWithDarkModeType = {
  ...v3,
  colors: {
    ...v3.colors,
    background: colors.mono0,
    onBackground: colors.mono100,
    onBackgroundHigh: colors.mono100,
    onBackgroundMedium: colors.mono60,
    onBackgroundLow: colors.mono30,
    surface: colors.mono0,
    onSurface: colors.mono100,
    onSurfaceHigh: colors.mono100,
    onSurfaceMedium: colors.mono60,
    onSurfaceLow: colors.mono5,
    primary: colors.mono100,
    onPrimaryHigh: colors.mono0,
    onPrimaryMedium: colors.mono5,
    onPrimaryLow: colors.mono5,
    secondary: colors.mono30,
    onSecondaryHigh: colors.mono100,
    onSecondaryMedium: colors.mono60,
    onSecondaryLow: colors.mono60,
    brand: colors.blue100,
    onBrand: colors.mono0,
  },
}

const v3dark: ThemeWithDarkModeType = {
  ...v3,
  colors: {
    ...THEME_DARK.colors,
    devpurple: v3.colors.devpurple,
    background: THEME_DARK.colors.mono0,
    onBackground: THEME_DARK.colors.mono100,
    onBackgroundHigh: THEME_DARK.colors.mono100,
    onBackgroundMedium: THEME_DARK.colors.mono100,
    onBackgroundLow: THEME_DARK.colors.mono60,
    surface: "#333",
    onSurface: THEME_DARK.colors.mono0,
    onSurfaceHigh: THEME_DARK.colors.mono0,
    onSurfaceMedium: THEME_DARK.colors.mono60,
    onSurfaceLow: "#555",
    primary: THEME_DARK.colors.mono0,
    onPrimaryHigh: THEME_DARK.colors.mono100,
    onPrimaryMedium: THEME_DARK.colors.mono60,
    onPrimaryLow: THEME_DARK.colors.mono60,
    secondary: THEME_DARK.colors.mono60,
    onSecondaryHigh: THEME_DARK.colors.mono0,
    onSecondaryMedium: THEME_DARK.colors.mono5,
    onSecondaryLow: THEME_DARK.colors.mono5,
    brand: THEME_DARK.colors.blue100,
    onBrand: THEME_DARK.colors.mono0,
  },
}

export const THEMES: {
  v3: ThemeType
  v3light: ThemeWithDarkModeType
  v3dark: ThemeWithDarkModeType
} = { v3, v3light, v3dark }

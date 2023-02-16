/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 * https://www.figma.com/file/gZNkyqLT8AU3T61tluVJyB/Artsy-3.1-Design-System
 */

import { THEME_V3 } from "@artsy/palette-tokens"
import { SpacingUnit as SpacingUnitV3Numbers } from "@artsy/palette-tokens/dist/themes/v3"
import {
  TextTreatment as TextTreatmentWithUnits,
  TextVariant as TextVariantV3,
} from "@artsy/palette-tokens/dist/typography/v3"
import {
  convertWebSpacingUnitsToMobile,
  convertWebTextTreatmentsToMobile,
} from "./utils/webTokensToMobile"
import { Neg } from "./utils/types"

export type { TextTreatmentWithUnits }

const {
  breakpoints: _mobileDoesntCareAboutBreakpoints,
  mediaQueries: _mobileDoesntCareAboutMediaQueries,
  grid: _mobileDoesntCareAboutGrid,
  textVariants: textVariantsWithUnits,
  space: spaceNumbers,
  ...mobileUsefulTHEME_V3
} = THEME_V3

export type SpacingUnitPixelValue = `${number}px` & {} // for things like `12px`
export type SpacingUnitDSValueNumber = SpacingUnitV3Numbers
export type SpacingUnitDSValueNumberNegative = Neg<SpacingUnitDSValueNumber>
export type SpacingUnitDSValue = SpacingUnitDSValueNumber | SpacingUnitDSValueNumberNegative
type SpacingUnitSpecialValue = 0 | "0px" | "auto"

export type SpacingUnit = SpacingUnitDSValue | SpacingUnitPixelValue | SpacingUnitSpecialValue

export type ColorCssString = string & {} // just an open rule here to allow for css names and other things for now

// we love our old purple, great color for our dev stuff nowadays!
type ColorDevPurple = "devpurple"

export const NAMED_LAYER_NAMES = [
  "black100",
  "black60",
  "black30",
  "black15",
  "black10",
  "black5",
  "white100",
  "blue150",
  "blue100",
  "blue10",
  "green150",
  "green100",
  "green10",
  "yellow150",
  "yellow100",
  "yellow10",
  "orange150",
  "orange100",
  "orange10",
  "red150",
  "red100",
  "red10",

  /** Adding this here for dev usage. Avoid using it for actual components. */
  "devpurple",
] as const
export type ColorNamedLayer = typeof NAMED_LAYER_NAMES[number]

export const ROLE_LAYER_NAMES = [
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
export type ColorRoleLayer = typeof ROLE_LAYER_NAMES[number]

export type ColorStrict = ColorNamedLayer | ColorRoleLayer
export type Color = ColorNamedLayer | ColorRoleLayer | ColorCssString

export const isUsageLayerName = (name: Color): name is ColorRoleLayer => {
  return ROLE_LAYER_NAMES.includes(name as any)
}

export const isNamedLayerName = (name: Color): name is ColorNamedLayer => {
  return NAMED_LAYER_NAMES.includes(name as any)
}

const fixColorV3 = (
  colors: typeof mobileUsefulTHEME_V3.colors
): Record<ColorNamedLayer, string> => {
  const ourColors = {
    ...colors,
    devpurple: "#6E1EFF",
  }
  return ourColors
}

type TextTreatmentWithoutUnits = {
  fontSize: number
  lineHeight: number
  letterSpacing?: number
}
export type TextTreatment = TextTreatmentWithoutUnits
export type { TextVariantV3 }

export type ThemeV3Type = {
  space: Record<SpacingUnitV3Numbers, `${number}px`>
  colors: Record<ColorNamedLayer, string>
  fonts: { sans: { regular: string; italic: string; medium: string; mediumItalic: string } }
  textTreatments: Record<TextVariantV3, TextTreatment>
}
export type ThemeV3WithDarkModeSupportType = {
  space: Record<SpacingUnitV3Numbers, `${number}px`>
  colors: Record<ColorStrict, string>
  fonts: { sans: { regular: string; italic: string; medium: string; mediumItalic: string } }
  textTreatments: Record<TextVariantV3, TextTreatment>
}
export type AllThemesType = ThemeV3Type & ThemeV3WithDarkModeSupportType

// These are for styled-system
export type SpacingUnitsTheme = { space: Record<SpacingUnit, any> }
export type ColorsTheme = { colors: Record<Color, any> }

const THEME = {
  ...mobileUsefulTHEME_V3,
  colors: {
    ...THEME_V3.colors,
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
  },
  space: convertWebSpacingUnitsToMobile(spaceNumbers),
  textTreatments: convertWebTextTreatmentsToMobile(textVariantsWithUnits),
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
  v3: ThemeV3Type
  v3light: ThemeV3WithDarkModeSupportType
  v3dark: ThemeV3WithDarkModeSupportType
} = {
  v3: THEME,
  v3light: THEME_LIGHT,
  v3dark: THEME_DARK,
}

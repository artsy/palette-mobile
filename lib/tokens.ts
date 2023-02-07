/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 * https://www.notion.so/artsy/Master-Library-810612339f474d0997fe359af4285c56
 */

import { THEME_V3 } from "@artsy/palette-tokens"
import { mapKeys, mapValues } from "lodash"
import {
  Color as ColorV3WithoutDevPurple,
  SpacingUnit as SpacingUnitV3Numbers,
} from "@artsy/palette-tokens/dist/themes/v3"
import {
  TextTreatment as TextTreatmentWithUnits,
  TextVariant as TextVariantV3,
} from "@artsy/palette-tokens/dist/typography/v3"

export type { TextTreatmentWithUnits }

const {
  breakpoints: _mobileDoesntCareAboutBreakpoints,
  mediaQueries: _mobileDoesntCareAboutMediaQueries,
  grid: _mobileDoesntCareAboutGrid,
  textVariants: textVariantsWithUnits,
  space: spaceNumbers,
  ...mobileUsefulTHEME_V3
} = THEME_V3

type SpacingUnitV3 = `${SpacingUnitV3Numbers}`
export type { SpacingUnitV3 }
type SpacingUnitPixels = number & {} // for things like `12` (which RN interprets as number of pixels)
type SpacingUnitStringPixels = `${number}px` & {} // for things like `12px`
export type SpacingUnitStrict = SpacingUnitV3
export type SpacingUnit = SpacingUnitStrict | SpacingUnitPixels | SpacingUnitStringPixels

// this function is converting the space values that come from palette-tokens
// from a string `"120px"` to a number `120`, and the key values
// from a number `0.5` to a string `"0.5"`.
const fixSpaceUnitsV3 = (
  units: typeof spaceNumbers
): {
  "0.5": number
  "1": number
  "2": number
  "4": number
  "6": number
  "12": number
} => {
  let fixed = units

  fixed = mapKeys(fixed, (_, numberKey) => `${numberKey}`) as any

  fixed = mapValues(fixed, (stringValueWithPx) => {
    const justStringValue = stringValueWithPx.split("px")[0]
    const numberValue = parseInt(justStringValue, 10)
    return numberValue
  }) as any

  return fixed as any
}

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

export const USAGE_LAYER_NAMES = [
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
export type ColorUsageLayer = typeof USAGE_LAYER_NAMES[number]

export type ColorStrict = ColorNamedLayer | ColorUsageLayer
export type Color = ColorNamedLayer | ColorUsageLayer | ColorCssString

export const isUsageLayerName = (name: Color): name is ColorUsageLayer => {
  return USAGE_LAYER_NAMES.includes(name as any)
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

export interface TextTreatment {
  fontSize: number
  lineHeight: number
  letterSpacing?: number
}
// this function is removing the `px` and `em` suffix and making the values into numbers
const fixTextTreatments = (
  variantsWithUnits: Record<"xxl" | "xl" | "lg" | "md" | "sm" | "xs", TextTreatmentWithUnits>
): Record<TextVariantV3, TextTreatment> => {
  const textTreatments = mapValues(variantsWithUnits, (treatmentWithUnits) => {
    const newTreatment = {} as TextTreatment
    ;(
      [
        ["fontSize", "px"],
        ["lineHeight", "px"],
        ["letterSpacing", "em"],
      ] as Array<[keyof TextTreatment, string]>
    ).forEach(([property, unit]) => {
      const originalValue = treatmentWithUnits[property]
      if (originalValue === undefined) {
        return undefined
      }
      const justStringValue = originalValue.split(unit)[0]
      const numberValue = parseInt(justStringValue, 10)
      newTreatment[property] = numberValue
    })
    return newTreatment
  })
  return textTreatments as any // TODO: fix this type
}

export type { TextVariantV3 }

export interface TextTreatment {
  fontSize: number
  lineHeight: number
  letterSpacing?: number
}

// TODO: maybe add types here to make sure each theme is using the right types from above?
export const THEMES = {
  v3: {
    ...mobileUsefulTHEME_V3,
    space: fixSpaceUnitsV3(spaceNumbers),
    colors: fixColorV3(mobileUsefulTHEME_V3.colors),
    fonts: {
      sans: {
        regular: "Unica77LL-Regular",
        italic: "Unica77LL-Italic",
        medium: "Unica77LL-Medium",
        mediumItalic: "Unica77LL-MediumItalic",
      },
    },
    textTreatments: fixTextTreatments(textVariantsWithUnits),
  },
  get v5light() {
    return {
      ...this.v3,
      colors: {
        ...this.v3.colors,
        background: this.v3.colors.white100,
        onBackground: this.v3.colors.black100,
        onBackgroundHigh: this.v3.colors.black100,
        onBackgroundMedium: this.v3.colors.black60,
        onBackgroundLow: this.v3.colors.black30,
        surface: this.v3.colors.white100,
        onSurface: this.v3.colors.black100,
        onSurfaceHigh: this.v3.colors.black100,
        onSurfaceMedium: this.v3.colors.black60,
        onSurfaceLow: this.v3.colors.black5,
        primary: this.v3.colors.black100,
        onPrimaryHigh: this.v3.colors.white100,
        onPrimaryMedium: this.v3.colors.black5,
        onPrimaryLow: this.v3.colors.black5,
        secondary: this.v3.colors.black30,
        onSecondaryHigh: this.v3.colors.black100,
        onSecondaryMedium: this.v3.colors.black60,
        onSecondaryLow: this.v3.colors.black60,
        brand: this.v3.colors.blue100,
        onBrand: this.v3.colors.white100,
      },
    }
  },
  /** @deprecated Use `v5light` */
  get v5() {
    return this.v5light
  },
  get v5dark() {
    return {
      ...this.v3,
      colors: {
        ...this.v3.colors,
        background: this.v3.colors.black100,
        onBackground: this.v3.colors.white100,
        onBackgroundHigh: this.v3.colors.white100,
        onBackgroundMedium: this.v3.colors.black30,
        onBackgroundLow: this.v3.colors.black60,
        surface: "#333",
        onSurface: this.v3.colors.white100,
        onSurfaceHigh: this.v3.colors.white100,
        onSurfaceMedium: this.v3.colors.black60,
        onSurfaceLow: "#555",
        primary: this.v3.colors.white100,
        onPrimaryHigh: this.v3.colors.black100,
        onPrimaryMedium: this.v3.colors.black60,
        onPrimaryLow: this.v3.colors.black60,
        secondary: this.v3.colors.black60,
        onSecondaryHigh: this.v3.colors.white100,
        onSecondaryMedium: this.v3.colors.black5,
        onSecondaryLow: this.v3.colors.black5,
        brand: this.v3.colors.blue100,
        onBrand: this.v3.colors.white100,
      },
    }
  },
}

export type Theme3Type = typeof THEMES.v3
export type Theme5LightType = typeof THEMES.v5light
export type Theme5DarkType = typeof THEMES.v5dark
export type AllThemesType = Theme3Type & Theme5LightType & Theme5DarkType

// These are for styled-system:
// tslint:disable-next-line:interface-over-type-literal
export type SpacingUnitsTheme = { space: Record<SpacingUnit, any> }
// tslint:disable-next-line:interface-over-type-literal
export type ColorsTheme = { colors: Record<Color, any> }

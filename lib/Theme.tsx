import { THEME_V2, THEME_V3 } from "@artsy/palette-tokens"
import { SpacingUnit as SpacingUnitV2 } from "@artsy/palette-tokens/dist/themes/v2"
import {
  Color as ColorV3BeforeDevPurple,
  SpacingUnit as SpacingUnitV3Numbers,
} from "@artsy/palette-tokens/dist/themes/v3"
import {
  TextTreatment as TextTreatmentWithUnits,
  TextVariant as TextVariantV3,
} from "@artsy/palette-tokens/dist/typography/v3"
import { mapValues, mapKeys, isString, split } from "lodash"
import { useContext } from "react"
import { ThemeContext, ThemeProvider } from "styled-components/native"
/**
 * All of the config for the Artsy theming system, based on the
 * design system from our design team:
 * https://www.notion.so/artsy/Master-Library-810612339f474d0997fe359af4285c56
 */

type SpacingUnitV3 = `${SpacingUnitV3Numbers}`
export type SpacingUnit = SpacingUnitV2 | SpacingUnitV3
export type Color =
  | ColorV3BeforeDevPurple
  // v5 stuff
  // Anything big/surface: background, cards, button fills, etc.  | "background"
  | "devpurple"
  | "yellow150"
  | "yellow100"
  | "yellow30"
  | "yellow10"
  | "orange10"
  | "orange100" // yellows and orange are temporary, until we add them to palette-tokens
  | "background"
  | "primary"
  | "secondary"
  | "brand"
  // Anything small, texts, icons, etc.
  | "onBackground" // same as onBackgroundHigh
  | "onBackgroundHigh"
  | "onBackgroundMedium"
  | "onBackgroundLow"
  | "onPrimaryHigh"
  | "onPrimaryMedium"
  | "onPrimaryLow"
  | "onSecondaryHigh"
  | "onSecondaryMedium"
  | "onSecondaryLow"
  | "onBrand"

export type { SpacingUnitV2, SpacingUnitV3 }
export type { TextVariantV3 }

const {
  breakpoints: _eigenDoesntCareAboutBreakpoints,
  mediaQueries: _eigenDoesntCareAboutMediaQueries,
  grid: _eigenDoesntCareAboutGrid,
  textVariants: textVariantsWithUnits,
  space: spaceNumbers,
  ...eigenUsefulTHEME_V3
} = THEME_V3

// this function is converting the space values that come from palette-tokens
// from a string `"120px"` to a number `120`.
const fixSpaceUnitsV2 = (
  units: typeof THEME_V2.space
): {
  0.3: number
  0.5: number
  1: number
  1.5: number
  2: number
  3: number
  4: number
  5: number
  6: number
  9: number
  12: number
  18: number
} => {
  let fixed = units

  fixed = mapValues(fixed, (stringValueWithPx) => {
    const justStringValue = split(stringValueWithPx, "px")[0]
    const numberValue = parseInt(justStringValue, 10)
    return numberValue
  }) as any

  return fixed as any
}

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

  fixed = mapKeys(fixed, (_value, numberKey) => `${numberKey}`) as any

  fixed = mapValues(fixed, (stringValueWithPx) => {
    const justStringValue = split(stringValueWithPx, "px")[0]
    const numberValue = parseInt(justStringValue, 10)
    return numberValue
  }) as any

  return fixed as any
}

export interface TextTreatment {
  fontSize: number
  lineHeight: number
  letterSpacing?: number
}

const fixColorV3 = (
  colors: typeof eigenUsefulTHEME_V3.colors
): typeof eigenUsefulTHEME_V3.colors & { devpurple: string } => {
  const ourColors = colors as any
  ourColors.devpurple = "#6E1EFF"
  ourColors.yellow150 = "#A47A0F"
  ourColors.yellow100 = "#A85F00"
  ourColors.yellow30 = "#FAE7BA"
  ourColors.yellow10 = "#F6EFE5"
  ourColors.orange10 = "#FCF7F3"
  ourColors.orange150 = "#A8501C"
  return colors as any
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
      const justStringValue = split(originalValue, unit)[0]
      const numberValue = parseInt(justStringValue, 10)
      newTreatment[property] = numberValue
    })
    return newTreatment
  })
  return textTreatments as any // TODO: fix this type
}

const colors = eigenUsefulTHEME_V3.colors

const fixedColorsV3 = fixColorV3(eigenUsefulTHEME_V3.colors)

const THEMES = {
  v2: {
    ...THEME_V2,
    fontFamily: {
      sans: {
        regular: { normal: "Unica77LL-Regular", italic: "Unica77LL-Italic" },
        medium: { normal: "Unica77LL-Medium", italic: "Unica77LL-MediumItalic" },
        semibold: { normal: null, italic: null },
      },
      serif: {
        regular: {
          normal: "ReactNativeAGaramondPro-Regular",
          italic: "ReactNativeAGaramondPro-Italic",
        },
        medium: { normal: null, italic: null },
        semibold: { normal: "ReactNativeAGaramondPro-Semibold", italic: null },
      },
    },
    fonts: { sans: "Unica77LL-Regular", serif: "ReactNativeAGaramondPro-Regular" },
    space: fixSpaceUnitsV2(THEME_V2.space),
  },
  v3: {
    ...eigenUsefulTHEME_V3,
    colors: fixedColorsV3,
    space: fixSpaceUnitsV3(spaceNumbers),
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
  v5: {
    ...eigenUsefulTHEME_V3,
    colors: {
      ...colors,
      background: colors.white100,
      onBackground: colors.black100,
      onBackgroundHigh: colors.black100,
      onBackgroundMedium: colors.black60,
      onBackgroundLow: colors.black30,
      primary: colors.black100,
      onPrimaryHigh: colors.white100,
      onPrimaryMedium: colors.black10,
      onPrimaryLow: colors.black10,
      secondary: colors.black30,
      onSecondaryHigh: colors.black100,
      onSecondaryMedium: colors.black60,
      onSecondaryLow: colors.black60,
      brand: colors.blue100,
      onBrand: colors.white100,
    },
    space: fixSpaceUnitsV3(spaceNumbers),
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
  v5dark: {
    ...eigenUsefulTHEME_V3,
    colors: {
      ...colors,
      background: colors.black100,
      onBackground: colors.white100,
      onBackgroundHigh: colors.white100,
      onBackgroundMedium: colors.black30,
      onBackgroundLow: colors.black30,
      primary: colors.white100,
      onPrimaryHigh: colors.black100,
      onPrimaryMedium: colors.black60,
      onPrimaryLow: colors.black60,
      secondary: colors.black60,
      onSecondaryHigh: colors.white100,
      onSecondaryMedium: colors.black10,
      onSecondaryLow: colors.black10,
      brand: colors.blue100,
      onBrand: colors.white100,
    },
    space: fixSpaceUnitsV3(spaceNumbers),
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
}

export type ThemeV3Type = typeof THEMES.v3
export type ThemeType = ThemeV3Type

const figureOutTheme = (theme: keyof typeof THEMES | ThemeType): ThemeType => {
  if (!isString(theme)) {
    return theme
  }

  // forcing v3 spaces, unless specifically requiring v2, in which case we use `spaceV2`
  const mergedSpacesV2WithV3OnTop = {
    ...THEMES.v2.space, // get the base v2
    ...THEMES.v3.space, // get the base v3 on top of that
    // now add the rest of the mappings
    "0.3": THEMES.v3.space["0.5"], // TODO-PALETTE-V3 replace all {0.3} and "0.3" with "0.5"
    "1.5": THEMES.v3.space["2"], // TODO-PALETTE-V3 replace all {1.5} and "1.5" with "2"
    "3": THEMES.v3.space["4"], // TODO-PALETTE-V3 replace all {3} and "3" with "4"
    "5": THEMES.v3.space["6"], // TODO-PALETTE-V3 replace all {5} and "5" with "6"
    "9": THEMES.v3.space["6"], // TODO-PALETTE-V3 replace all {9} and "9" with "6"
    "18": THEMES.v3.space["12"], // TODO-PALETTE-V3 replace all {18} and "18" with "12"
  }
  // TODO-PALETTE-V3 remove the mapping as the last TODO-PALETTE-V3 to be done for space

  if (theme === "v5") {
    return THEMES.v5 as any // TODO: fix this type
  }
  if (theme === "v5dark") {
    return THEMES.v5dark as any // TODO: fix this type
  }

  return { ...THEMES.v3, space: mergedSpacesV2WithV3OnTop }
}

export const Theme = ({
  children,
  theme = "v3",
}: {
  children?: React.ReactNode
  theme?: keyof typeof THEMES | ThemeType
}) => {
  const actualTheme = figureOutTheme(theme)
  return <ThemeProvider theme={actualTheme}>{children}</ThemeProvider>
}

export interface ColorFuncOverload {
  (colorNumber: undefined): undefined
  (colorNumber: Color): string
  (colorNumber: Color | undefined): string | undefined
}
const color =
  (theme: ThemeType): ColorFuncOverload =>
  (colorName: any): any => {
    if (colorName === undefined) {
      return undefined
    }
    return (theme.colors as { [key: string]: string })[colorName as Color]
  }

const space =
  (theme: ThemeType) =>
  (spaceName: SpacingUnitV2 | SpacingUnitV3): number =>
    theme.space[spaceName as SpacingUnitV3]

export const useTheme = () => {
  const theme: ThemeType = useContext(ThemeContext)

  // if we are not wrapped in `<Theme>`, if we dev, throw error.
  // if we are in prod, we will default to v2 to avoid a crash.
  // if we are wrapped, then all good.
  if ((__DEV__ || __TEST__) && theme === undefined) {
    console.error(
      "You are trying to use the `Theme` but you have not wrapped your component/screen with `<Theme>`. Please wrap and try again."
    )
    throw new Error(
      "ThemeContext is not defined. Wrap your component with `<Theme>` and try again."
    )
  }
  const themeIfUnwrapped = THEMES.v3

  return {
    theme: theme ?? themeIfUnwrapped,
    color: color(theme ?? themeIfUnwrapped),
    space: space(theme ?? themeIfUnwrapped),
  }
}

export const isThemeV3 = (theme: ThemeType): theme is ThemeV3Type => theme.id === "v3"

/**
 * Only use this if it's are absolutely neccessary, and only in tests.
 */
// tslint:disable-next-line:variable-name
export const _test_THEMES = THEMES

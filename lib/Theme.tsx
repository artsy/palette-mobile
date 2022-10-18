import { useContext } from "react"
import { isString } from "remeda"
import { ThemeContext, ThemeProvider } from "styled-components/native"
import { AllThemesType, Color, SpacingUnit, Theme3Type, Theme5LightType, THEMES } from "./tokens"

const figureOutTheme = (
  theme: keyof typeof THEMES | AllThemesType
): Theme3Type | Theme5LightType => {
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

  if (theme === "v5" || theme === "v5light") return THEMES.v5light

  if (theme === "v5dark") return THEMES.v5dark

  return { ...THEMES.v3, space: mergedSpacesV2WithV3OnTop }
}

export const Theme = ({
  children,
  theme = "v5",
}: {
  children?: React.ReactNode
  theme?: keyof typeof THEMES | AllThemesType
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
  (theme: AllThemesType): ColorFuncOverload =>
  (colorName: any): any => {
    if (colorName === undefined) {
      return undefined
    }
    return (theme.colors as { [key: string]: string })[colorName as Color]
  }

const space =
  (theme: AllThemesType) =>
  (spaceName: SpacingUnit): number =>
    theme.space[spaceName as keyof AllThemesType["space"]]

export const useTheme = () => {
  const theme: AllThemesType = useContext(ThemeContext)

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

export const isThemeV3 = (theme: AllThemesType) => theme.id === "v3"

/**
 * Only use this if it's are absolutely neccessary, and only in tests.
 */
// tslint:disable-next-line:variable-name
export const _test_THEMES = THEMES

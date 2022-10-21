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

  if (theme === "v5" || theme === "v5light") return THEMES.v5light

  if (theme === "v5dark") return THEMES.v5dark

  return THEMES.v3
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

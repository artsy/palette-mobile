import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { useContext } from "react"
import { ThemeContext } from "styled-components/native"
import { AllThemesType, THEMES, ThemeType, ThemeWithDarkModeType } from "../../tokens"
import { Color, ColorDSValue } from "../../types"
import { isTestEnvironment } from "../tests/isTestEnvironment"

export const useTheme = (): {
  theme: ThemeType | ThemeWithDarkModeType
  space: SpaceFn
  color: ColorFn
} => {
  const maybeTheme = useContext<AllThemesType | undefined>(ThemeContext)

  // if we are not wrapped in `<Theme>`, if we dev, throw error.
  // if we are in prod, we will default to v2 to avoid a crash.
  // if we are wrapped, then all good.
  if ((__DEV__ || isTestEnvironment()) && maybeTheme === undefined) {
    console.error(
      "You are trying to use the `Theme` context but you have not wrapped your component/screen with `<Theme>`. Please wrap and try again."
    )
    throw new Error(
      "ThemeContext is not defined. Wrap your component with `<Theme>` and try again."
    )
  }

  const defaultTheme = THEMES.v3light
  const theme = maybeTheme ?? defaultTheme

  return {
    theme,
    space: space(theme),
    color: color(theme),
  }
}

type SpaceFn = (spaceName: SpacingUnit) => number

const space =
  (theme: AllThemesType): SpaceFn =>
  (spaceName) => {
    const pixelValue = theme.space[spaceName]
    return Number(pixelValue.split("px")[0])
  }

// TODO: make this stricter for types. only allow ColorStrict.
export interface ColorFn {
  (colorNumber: undefined): undefined
  (colorNumber: ColorDSValue | Color): string
  (colorNumber: ColorDSValue | Color | undefined): string | undefined
}

const color =
  (theme: AllThemesType): ColorFn =>
  (colorName: any): any => {
    if (colorName === undefined) {
      return undefined
    }

    const themeColor = (theme.colors as { [key: string]: string })[colorName as Color]

    // return the color that was passed if it's not supported by the theme (e.g., for a theme-independent `white`).
    if (!themeColor) {
      return colorName
    }
    return themeColor
  }

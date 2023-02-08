import { useContext } from "react"
import { isString } from "lodash"
import { ThemeContext, ThemeProvider } from "styled-components/native"
import {
  AllThemesType,
  Color,
  SpacingUnit,
  ThemeV3Type,
  ThemeV5Type,
  THEMES,
  SpacingUnitPixelValue,
} from "./tokens"

const figureOutTheme = (theme: keyof typeof THEMES | AllThemesType): ThemeV3Type | ThemeV5Type => {
  if (!isString(theme)) {
    return theme
  }

  if (theme === "v5light") return THEMES.v5light

  if (theme === "v5dark") return THEMES.v5dark

  return THEMES.v3
}

export const Theme = ({
  children,
  theme = "v5light",
}: {
  children?: React.ReactNode
  theme?: keyof typeof THEMES | AllThemesType
}) => {
  const actualTheme = figureOutTheme(theme)
  return <ThemeProvider theme={actualTheme}>{children}</ThemeProvider>
}

/**
 * Only use this if it's are absolutely neccessary, and only in tests.
 */
export const _test_THEMES = THEMES

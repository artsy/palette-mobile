import { useContext } from "react"
import { isString } from "lodash"
import { ThemeContext, ThemeProvider } from "styled-components/native"
import { AllThemesType, ThemeV3Type, ThemeV3WithDarkModeSupportType, THEMES } from "./tokens"

const figureOutTheme = (
  theme: keyof typeof THEMES | AllThemesType
): ThemeV3Type | ThemeV3WithDarkModeSupportType => {
  if (!isString(theme)) {
    return theme
  }

  if (theme === "v3light") return THEMES.v3light

  if (theme === "v3dark") return THEMES.v3dark

  return THEMES.v3
}

export const Theme = ({
  children,
  theme = "v3light",
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

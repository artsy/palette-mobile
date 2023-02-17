import { ThemeProvider } from "styled-components/native"
import { ThemeType, ThemeWithDarkModeType, THEMES } from "./tokens"

type ThemeOptions = keyof typeof THEMES

interface ThemeProps {
  children?: React.ReactNode
  theme?: ThemeOptions
}

export const Theme: React.FC<ThemeProps> = ({ children, theme = "v3light" }) => {
  const currentTheme = getTheme(theme)

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
}

const getTheme = (theme: ThemeOptions): ThemeType | ThemeWithDarkModeType => {
  if (theme === "v3light") {
    return THEMES.v3light
  }

  if (theme === "v3dark") {
    return THEMES.v3dark
  }

  return THEMES.v3light
}

/**
 * Only use this if it's are absolutely neccessary, and only in tests.
 */
export const _test_THEMES = THEMES

import { createTheme, ThemeProvider as RestyleThemeProvider } from "@shopify/restyle"
import { useMemo } from "react"
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components/native"
import { ThemeType, ThemeWithDarkModeType, THEMES } from "./tokens"

type ThemeOptions = keyof typeof THEMES

interface ThemeProps {
  children?: React.ReactNode
  theme?: ThemeOptions
}

export const Theme: React.FC<ThemeProps> = ({ children, theme = "v3light" }) => {
  const currentTheme = getTheme(theme)

  const restyleTheme = useMemo(() => createTheme(currentTheme), [currentTheme])

  return (
    <RestyleThemeProvider theme={restyleTheme}>
      <StyledComponentsThemeProvider theme={currentTheme}>{children}</StyledComponentsThemeProvider>
    </RestyleThemeProvider>
  )
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

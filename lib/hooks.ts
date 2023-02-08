import { ThemeContext } from "styled-components/native"
import { useContext } from "react"
import { AllThemesType, Color, ColorStrict, SpacingUnitDSValueNumber, THEMES } from "./tokens"

type SpaceFn = (spaceName: SpacingUnitDSValueNumber) => number
const space =
  (theme: AllThemesType): SpaceFn =>
  (spaceName) => {
    const pixelValue = theme.space[spaceName as keyof AllThemesType["space"]]
    return Number(pixelValue.replace("px", ""))
  }

// TODO: make this stricter for types. only allow ColorStrict.
export interface ColorFn {
  (colorNumber: undefined): undefined
  (colorNumber: ColorStrict): string
  (colorNumber: Color | undefined): string | undefined
}
const color =
  (theme: AllThemesType): ColorFn =>
  (colorName: any): any => {
    if (colorName === undefined) return undefined

    return (theme.colors as { [key: string]: string })[colorName as Color]
  }

export const useTheme = (): {
  theme: AllThemesType
  space: SpaceFn
  color: ColorFn
} => {
  const maybeTheme: AllThemesType | undefined = useContext(ThemeContext)

  // if we are not wrapped in `<Theme>`, if we dev, throw error.
  // if we are in prod, we will default to v2 to avoid a crash.
  // if we are wrapped, then all good.
  if ((__DEV__ || __TEST__) && maybeTheme === undefined) {
    console.error(
      "You are trying to use the `Theme` context but you have not wrapped your component/screen with `<Theme>`. Please wrap and try again."
    )
    throw new Error(
      "ThemeContext is not defined. Wrap your component with `<Theme>` and try again."
    )
  }

  const defaultTheme = THEMES.v5light
  const theme = maybeTheme ?? defaultTheme

  return {
    theme: theme,
    space: space(theme),
    color: color(theme),
  }
}

export const useSpace = () => useTheme().space
export const useColor = () => useTheme().color

import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { useContext } from "react"
import { ThemeContext } from "styled-components"
import { Themes, THEMES } from "../../tokens"
import { AdditionalColorLayers, Color, Colors } from "../../types"

export const useTheme = (): {
  theme: Themes
  space: SpaceFn
  color: ColorFn
} => {
  const maybeTheme = useContext(ThemeContext)

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

  const defaultTheme = THEMES.v3light
  const theme = maybeTheme ?? defaultTheme

  return {
    theme: theme,
    space: space(theme),
    color: color(theme),
  }
}

type SpaceFn = (spaceName: SpacingUnit) => number

const space =
  (theme: Themes): SpaceFn =>
  (spaceName) => {
    const pixelValue = theme.space[spaceName as keyof Themes["space"]]
    return Number(pixelValue.split("px")[0])
  }

// TODO: make this stricter for types. only allow ColorStrict.
export interface ColorFn {
  (colorNumber: undefined): undefined
  (colorNumber: Colors | AdditionalColorLayers): string
  (colorNumber: Color | undefined): string | undefined
}

const color =
  (theme: Themes): ColorFn =>
  (colorName: any): any => {
    if (colorName === undefined) {
      return undefined
    }

    return (theme.colors as { [key: string]: string })[colorName as Color]
  }

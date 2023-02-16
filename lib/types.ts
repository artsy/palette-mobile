import { SpacingUnit as BaseSpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { ADDITIONAL_COLOR_LAYERS, mobileTokens } from "./tokens"
import { Neg } from "./utils/types"

export type NegativeBaseSpacingUnit = Neg<BaseSpacingUnit>
export type SpacingUnitPixelValue = `${number}px` & {}

export type SpacingUnit =
  | BaseSpacingUnit
  | NegativeBaseSpacingUnit
  | SpacingUnitPixelValue
  | 0
  | "0px"
  | "auto"

export type Colors = keyof typeof mobileTokens.colors
export type AdditionalColorLayers = keyof typeof ADDITIONAL_COLOR_LAYERS
export type Color = Colors | AdditionalColorLayers | (string & {})

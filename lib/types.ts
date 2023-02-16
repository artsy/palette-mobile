import { SpacingUnit as BaseSpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { COLOR_LAYER_ROLE, COLOR_LAYER_NAME } from "./tokens"
import { Neg } from "./utils/types"

export type SpacingUnitDSValueNumber = BaseSpacingUnit
export type SpacingUnitDSValueNegativeNumber = Neg<SpacingUnitDSValueNumber>
export type SpacingUnitDSValue = SpacingUnitDSValueNumber | SpacingUnitDSValueNegativeNumber
export type SpacingUnitPixelValue = `${number}px` & {}
export type SpacingUnitSpecialValue = 0 | "0px" | "auto"

export type SpacingUnit = SpacingUnitDSValue | SpacingUnitPixelValue | SpacingUnitSpecialValue

export type ColorLayerName = keyof typeof COLOR_LAYER_NAME
export type ColorLayerRole = keyof typeof COLOR_LAYER_ROLE
export type ColorCSS = string & {}
export type ColorDSValue = ColorLayerName | ColorLayerRole
export type Color = ColorLayerName | ColorLayerRole | ColorCSS

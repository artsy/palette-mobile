import { THEME_V3 } from "@artsy/palette-tokens"
import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { TextTreatment, TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { mapValues } from "lodash"
import { SpacingUnitPixelValue } from "../types"

export type TextTreatmentWithoutUnits = {
  fontSize: number
  lineHeight: number
  letterSpacing?: number
}

/**
 * This function is converting the space values that come from palette-tokens
 * from a string `"120px"` to a number `120`, and the key values from a number
 * `0.5` to a string `"0.5"`.
 */
export const convertWebSpacingUnitsToMobile = (
  withUnits: typeof THEME_V3.space
): Record<SpacingUnit, SpacingUnitPixelValue> => {
  return withUnits as Record<SpacingUnit, SpacingUnitPixelValue>
}

/**
 * This function is removing the `px` and `em` suffix and making the values
 * into numbers. letterspacing, fontSize, and lineHeight all take numbers
 * without units.
 *
 * @see https://reactnative.dev/docs/text-style-props
 */
export const convertWebTextTreatmentsToMobile = (
  withUnits: Record<TextVariant, TextTreatment>
): Record<TextVariant, TextTreatmentWithoutUnits> => {
  const textTreatments = mapValues(withUnits, (treatmentWithUnits) => {
    const newTreatment = {} as TextTreatmentWithoutUnits

    const valuesToConvert = [
      ["fontSize", "px"],
      ["lineHeight", "px"],
      ["letterSpacing", "em"],
    ] as Array<[keyof TextTreatmentWithoutUnits, string]>

    valuesToConvert.forEach(([property, unit]) => {
      const originalValue = treatmentWithUnits[property]
      if (originalValue === undefined) {
        return undefined
      }
      const justStringValue = originalValue.split(unit)[0]
      const numberValue = Number(justStringValue)
      newTreatment[property] = numberValue
    })

    return newTreatment
  })

  return textTreatments as any
}

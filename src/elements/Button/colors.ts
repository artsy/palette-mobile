import { ButtonProps } from "./Button"
import { useColor } from "../../utils/hooks/useColor"
import { NoUndefined } from "../../utils/types"

type State = "disabled" | "pressed" | "active"

export const useColorsForVariantAndState = (): Record<
  NoUndefined<ButtonProps["variant"]>,
  Record<State, { bg: string; border: string; text: string }>
> => {
  const color = useColor()

  return {
    fillDark: {
      disabled: { bg: color("mono30"), border: color("mono30"), text: color("onPrimaryHigh") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("onPrimaryHigh") },
      active: { bg: color("primary"), border: color("primary"), text: color("onPrimaryHigh") },
    },
    fillLight: {
      disabled: { bg: color("mono30"), border: color("mono30"), text: color("onPrimaryHigh") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("onPrimaryHigh") },
      active: {
        bg: color("mono0"),
        border: color("mono0"),
        text: color("mono100"),
      },
    },
    fillGray: {
      disabled: { bg: color("mono30"), border: color("mono30"), text: color("mono0") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("mono0") },
      active: { bg: color("mono10"), border: color("mono10"), text: color("mono100") },
    },
    fillSuccess: {
      disabled: { bg: color("blue100"), border: color("blue100"), text: color("mono0") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("mono0") },
      active: { bg: color("blue10"), border: color("blue10"), text: color("mono0") },
    },
    outline: {
      disabled: {
        bg: color("background"),
        border: color("onBackgroundLow"),
        text: color("onBackgroundLow"),
      },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("mono0") },
      active: {
        bg: color("background"),
        border: color("onBackgroundMedium"),
        text: color("onBackgroundHigh"),
      },
    },
    outlineGray: {
      disabled: {
        bg: color("mono0"),
        border: color("mono30"),
        text: color("mono30"),
      },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("mono0") },
      active: {
        bg: color("mono0"),
        border: color("mono30"),
        text: color("mono100"),
      },
    },
    outlineLight: {
      disabled: {
        bg: "rgba(0, 0, 0, 0)",
        border: color("mono30"),
        text: color("mono30"),
      },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("mono0") },
      active: {
        bg: "rgba(0, 0, 0, 0)",
        border: color("mono0"),
        text: color("mono0"),
      },
    },
    text: {
      disabled: { bg: "rgba(0, 0, 0, 0)", border: "rgba(0, 0, 0, 0)", text: color("mono30") },
      pressed: { bg: color("mono10"), border: color("mono10"), text: color("blue100") },
      active: { bg: "rgba(0, 0, 0, 0)", border: "rgba(0, 0, 0, 0)", text: color("mono100") },
    },
  }
}

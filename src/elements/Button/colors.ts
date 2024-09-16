import { ButtonProps } from "./Button"
import { useColor } from "../../utils/hooks"
import { NoUndefined } from "../../utils/types"

type State = "disabled" | "pressed" | "active" | "loading"

export const useColorsForVariantAndState = (): Record<
  NoUndefined<ButtonProps["variant"]>,
  Record<State, { bg: string; border: string; text: string; loader?: string }>
> => {
  const color = useColor()

  return {
    fillDark: {
      disabled: { bg: color("black30"), border: color("black30"), text: color("onPrimaryHigh") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("onPrimaryHigh") },
      active: { bg: color("primary"), border: color("primary"), text: color("onPrimaryHigh") },
      loading: {
        bg: color("black100"),
        border: color("black100"),
        text: "rgba(0, 0, 0, 0)",
        loader: "white100",
      },
    },
    fillLight: {
      disabled: { bg: color("black30"), border: color("black30"), text: color("onPrimaryHigh") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("onPrimaryHigh") },
      active: {
        bg: color("white100"),
        border: color("white100"),
        text: color("black100"),
      },
      loading: {
        bg: color("white100"),
        border: color("white100"),
        text: "rgba(0, 0, 0, 0)",
        loader: "black100",
      },
    },
    fillGray: {
      disabled: { bg: color("black30"), border: color("black30"), text: color("white100") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("white100") },
      active: { bg: color("black10"), border: color("black10"), text: color("black100") },
      loading: {
        bg: color("black10"),
        border: color("black10"),
        text: "rgba(0, 0, 0, 0)",
        loader: "black100",
      },
    },
    fillSuccess: {
      disabled: { bg: color("blue100"), border: color("blue100"), text: color("white100") },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("white100") },
      active: { bg: color("blue10"), border: color("blue10"), text: color("white100") },
      loading: {
        bg: color("blue100"),
        border: color("blue100"),
        text: "rgba(0, 0, 0, 0)",
        loader: "white100",
      },
    },
    outline: {
      disabled: {
        bg: color("white100"),
        border: color("black100"),
        text: color("black100"),
      },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("white100") },
      active: {
        bg: color("white100"),
        border: color("black60"),
        text: color("black100"),
      },
      loading: {
        bg: color("white100"),
        border: color("black60"),
        text: "rgba(0, 0, 0, 0)",
        loader: "black100",
      },
    },
    outlineGray: {
      disabled: {
        bg: color("white100"),
        border: color("black30"),
        text: color("black30"),
      },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("white100") },
      active: {
        bg: color("white100"),
        border: color("black60"),
        text: color("black100"),
      },
      loading: {
        bg: color("white100"),
        border: color("black30"),
        text: "rgba(0, 0, 0, 0)",
        loader: "black100",
      },
    },
    outlineLight: {
      disabled: {
        bg: "rgba(0, 0, 0, 0)",
        border: color("black30"),
        text: color("black30"),
      },
      pressed: { bg: color("blue100"), border: color("blue100"), text: color("white100") },
      active: {
        bg: "rgba(0, 0, 0, 0)",
        border: color("white100"),
        text: color("white100"),
      },
      loading: {
        bg: "rgba(0,0,0,0)",
        border: color("white100"),
        text: "rgba(0, 0, 0, 0)",
        loader: "white100",
      },
    },
    text: {
      disabled: { bg: "rgba(0, 0, 0, 0)", border: "rgba(0, 0, 0, 0)", text: color("black30") },
      pressed: { bg: color("black10"), border: color("black10"), text: color("blue100") },
      active: { bg: "rgba(0, 0, 0, 0)", border: "rgba(0, 0, 0, 0)", text: color("black100") },
      loading: {
        bg: color("white100"),
        border: color("white100"),
        text: "rgba(0, 0, 0, 0)",
        loader: "blue100",
      },
    },
  }
}

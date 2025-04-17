import { Color } from "@artsy/palette-tokens"
import { Platform, Switch as RNSwitch, SwitchProps as RNSwitchProps } from "react-native"
import { useColor } from "../../utils/hooks"

type CustomSwitchProps = Omit<
  RNSwitchProps,
  | "trackColor"
  | "thumbColor"
  | "ios_backgroundColor"
  | "thumbTintColor"
  | "tintColor"
  | "onTintColor"
>

export interface SwitchProps extends CustomSwitchProps {
  /**
   * The circular thumb's color on the 'ON' switch.
   */
  thumbColorActive?: Color
  /**
   * The circular thumb's color on the 'OFF' switch.
   */
  thumbColorInactive?: Color
  /**
   * The background's color on the 'ON' switch.
   */
  trackColorActive?: Color
  /**
   * The background's color on the 'OFF' switch.
   */
  trackColorInactive?: Color
}

export const Switch = ({
  value,
  // Regardless of the color scheme, the thumb and track colors are always white
  // @ts-expect-error
  thumbColorActive = Platform.OS === "ios" ? "white" : "blue100",
  // Regardless of the color scheme, the thumb and track colors are always white
  // @ts-expect-error
  thumbColorInactive = Platform.OS === "ios" ? "white" : "mono10",
  trackColorActive = Platform.OS === "ios" ? "blue100" : "blue10",
  trackColorInactive = "mono30",
  disabled,
  ...restProps
}: SwitchProps) => {
  const color = useColor()
  let thumbColor = value ? color(thumbColorActive) : color(thumbColorInactive)
  let trackColor = {
    false: color(trackColorInactive),
    true: color(trackColorActive),
  }
  let iosBackground = color(trackColorInactive)

  if (disabled) {
    thumbColor = Platform.OS === "ios" ? color("mono0") : color("mono30")
    trackColor = {
      false: color("mono10"),
      true: Platform.OS === "ios" ? color("mono30") : color("mono10"),
    }
    iosBackground = color("mono10")
  }

  return (
    <RNSwitch
      accessibilityRole="switch"
      value={value}
      disabled={disabled}
      thumbColor={thumbColor}
      trackColor={trackColor}
      ios_backgroundColor={iosBackground}
      {...restProps}
    />
  )
}

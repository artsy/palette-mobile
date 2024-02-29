import { Color } from "@artsy/palette-tokens"
import { Platform, Switch as RNSwitch, SwitchProps as RNSwitchProps } from "react-native"
import { useColor } from "../../utils/hooks"

type CustomSwitchProps = Omit<
  RNSwitchProps,
  | "onValueChange"
  | "onChange"
  | "trackColor"
  | "thumbColor"
  | "ios_backgroundColor"
  | "thumbTintColor"
  | "tintColor"
  | "onTintColor"
>

export interface SwitchProps extends CustomSwitchProps {
  onChange: (value: boolean) => void | Promise<void>
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
  onChange,
  thumbColorActive = Platform.OS === "ios" ? "white100" : "blue100",
  thumbColorInactive = Platform.OS === "ios" ? "white100" : "black10",
  trackColorActive = Platform.OS === "ios" ? "blue100" : "blue10",
  trackColorInactive = "black30",
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
    thumbColor = Platform.OS === "ios" ? color("white100") : color("black30")
    trackColor = {
      false: color("black10"),
      true: color("black10"),
    }
    iosBackground = color("black10")
  }

  return (
    <RNSwitch
      accessibilityRole="switch"
      value={value}
      disabled={disabled}
      onValueChange={onChange}
      thumbColor={thumbColor}
      trackColor={trackColor}
      ios_backgroundColor={iosBackground}
      {...restProps}
    />
  )
}

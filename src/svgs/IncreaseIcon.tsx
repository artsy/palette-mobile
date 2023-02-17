import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const IncreaseIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 10 10">
      <Path
        d="M0 4.92701L0.927644 5.83942L4.34137 2.31752V10H5.67718V2.31752L9.07236 5.83942L10 4.92701L5.00928 0L0 4.92701Z"
        fill={color(fill)}
      />
    </Icon>
  )
}

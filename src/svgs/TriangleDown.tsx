import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const TriangleDown = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon width="11" height="6" {...restProps} viewBox="0 0 11 6">
      <Path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M5.5 6L0 0L11 0L5.5 6Z"
        fill={color(fill) ?? color("black100")}
      />
    </Icon>
  )
}

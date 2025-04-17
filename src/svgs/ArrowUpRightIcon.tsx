import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArrowUpRightIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M4.17188 14.8125L3.1875 13.8281L11.6625 5.34375H6.64688V3.9375H14.0531V11.3438H12.6469V6.32813L4.17188 14.8125Z"
        fillRule="nonzero"
        fill={color(fill)}
      />
    </Icon>
  )
}

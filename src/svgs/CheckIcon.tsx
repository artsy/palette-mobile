import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const CheckIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M6.936 12.206l7.64-7.63.848.849-8.492 8.48-4.248-4.282.852-.846z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

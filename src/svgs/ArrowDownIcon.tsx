import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArrowDownIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 12.88L2.06 5.94l.88-.88L9 11.12l6.06-6.06.88.88z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArrowLeftIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M12.06 15.94L5.12 9l6.94-6.94.88.88L6.88 9l6.06 6.06z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

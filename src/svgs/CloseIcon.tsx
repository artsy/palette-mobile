import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const CloseIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9.88 9l4.56 4.56-.88.88L9 9.88l-4.56 4.56-.88-.88L8.12 9 3.56 4.44l.88-.88L9 8.12l4.56-4.56.88.88z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

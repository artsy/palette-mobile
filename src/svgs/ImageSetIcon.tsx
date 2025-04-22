import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ImageSetIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6H2V16H12V6ZM1 5V17H13V5H1Z"
        fill={color(fill)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3H3V4H14L14 15H15V4V3H14Z"
        fill={color(fill)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 1H5V2H16L16 13H17V2V1H16Z"
        fill={color(fill)}
      />
    </Icon>
  )
}

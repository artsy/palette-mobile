import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const PageIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M12 7.584H8.5V4H6v10h6V7.584zm-.903-1L9.5 4.946v1.638h1.597zM5 3h4l4 4.104V15H5V3z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

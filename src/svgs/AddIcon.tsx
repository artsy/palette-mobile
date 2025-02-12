import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const AddIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M15 9.5H9.514V15H8.476V9.5H3V8.48h5.476V3h1.038v5.48H15z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../hooks"

export const HeartIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M12 3a4 4 0 0 0-2.83 1.17L9 4.34l-.17-.17a4.002 4.002 0 0 0-5.66 5.66l5.48 5.47a.48.48 0 0 0 .7 0l5.48-5.47A4 4 0 0 0 12 3zm2.12 6.12L9 14.24 3.88 9.12a3 3 0 1 1 4.24-4.24l.53.52.35.36.35-.36.53-.52a3 3 0 0 1 4.24 4.24z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

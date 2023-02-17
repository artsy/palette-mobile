import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const DocumentIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M14 2H4v14h10V2zm1-.5v15a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5zM6 10h6v1H6v-1zm0 3h4v1H6v-1z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

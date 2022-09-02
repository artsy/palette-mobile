import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../hooks"

export const LoaderIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path fill={color(fill)} d="M2 9.55v-1h14v1z" fillRule="nonzero" />
    </Icon>
  )
}

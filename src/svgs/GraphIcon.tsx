import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const GraphIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M4 10h1v5H4v-5zm3-2h1v7H7V8zm3-3h1v10h-1V5zm3-2h1v12h-1V3z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

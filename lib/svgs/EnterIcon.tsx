import { G, Icon, IconProps, Path } from "./Icon"
import { useColor } from "../hooks"

export const EnterIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <G>
        <Path
          d="M4.883 11.244l3.108 3.068-.693.688L3 10.758l4.299-4.23.692.689-3.106 3.056h9.134V3H15v8.244H4.883z"
          fill={color(fill)}
          fillRule="nonzero"
        />
      </G>
    </Icon>
  )
}

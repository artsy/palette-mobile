import { G, Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const MenuIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <G fill={color(fill)} fillRule="evenodd">
        <Path d="M3 3h12.026v1H3zM3 8.512h12.026V9.5H3zM3 13.996h12.026V15H3z" />
      </G>
    </Icon>
  )
}

///wow

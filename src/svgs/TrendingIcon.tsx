import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const TrendingIcon = ({ fill = "black100", ...restprops }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restprops} viewBox="0 0 18 18">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.68125 13.3594L1.6875 12.375L7.07813 6.95625L10.0219 9.9L13.9313 6.04688H11.9625V4.64062H16.3125V8.99063H14.9063V7.02188L10.0313 11.9063L7.0875 8.9625L2.68125 13.3594Z"
        fill={color(fill)}
      />
    </Icon>
  )
}

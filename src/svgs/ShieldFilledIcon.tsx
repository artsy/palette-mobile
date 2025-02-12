import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ShieldFilledIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9,2L3.5,4.1v4.2c0,1.8,0.5,3.4,1.5,4.9s2.3,2.5,4,2.9c1.6-0.4,2.9-1.4,4-2.9c1-1.5,1.5-3.1,1.5-4.9V4.1L9,2z M8.2,11.3L5.8,8.8L6.6,8l1.7,1.8l3.1-3.2l0.7,0.7L8.2,11.3z"
        fill={color(fill)}
      />
    </Icon>
  )
}

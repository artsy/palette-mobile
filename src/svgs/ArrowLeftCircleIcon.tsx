import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArrowLeftCircleIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 1.889A7.111 7.111 0 1 1 9 16.11 7.111 7.111 0 0 1 9 1.89zM9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm2.169 11.556L7.569 9l3.6-3.511-.782-.791L5.987 9l4.444 4.302.738-.746z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

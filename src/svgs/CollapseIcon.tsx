import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const CollapseIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M7 11.708L2.76 15.96l-.708-.706L6.293 11H2v-1h6v6H7v-4.292zM11 6.292l4.24-4.252.708.706L11.707 7H16v1h-6V2h1v4.292z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

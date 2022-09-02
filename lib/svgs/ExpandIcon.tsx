import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../hooks"

export const ExpandIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M15 3.708L10.76 7.96l-.708-.706L14.293 3H10V2h6v6h-1V3.708zM3 14.292l4.24-4.252.708.706L3.707 15H8v1H2v-6h1v4.292z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const UserSingleIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 3a2.51 2.51 0 1 1 0 5.02A2.51 2.51 0 0 1 9 3zm0-1a3.51 3.51 0 1 0 0 7.02A3.51 3.51 0 0 0 9 2zm6 11v3h-1v-3a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 4 13v3H3v-3a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 15 13z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

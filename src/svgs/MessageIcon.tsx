import { Path } from "react-native-svg"
import { Icon, IconProps } from "./Icon"
import { useColor } from "../utils/hooks"

export const MessageIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M11.006 10.936H14V5H4v5.936h3.425l1.641 2.353 1.94-2.353zM3 4h12v7.936h-3.522L9 14.942l-2.096-3.006H3V4z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

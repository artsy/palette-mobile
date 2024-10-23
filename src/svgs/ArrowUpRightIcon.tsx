import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArrowUpRightIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M4.16531 14.625L3.375 13.8347L11.9597 5.25H6.75V4.125H13.875V11.25H12.75V6.04031L4.16531 14.625Z"
        fillRule="nonzero"
        fill={color(fill)}
      />
    </Icon>
  )
}

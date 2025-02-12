import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const CloseCircleIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm0 15.111A7.111 7.111 0 1 1 9 1.89 7.111 7.111 0 0 1 9 16.11zm3.502-9.831L9.782 9l2.72 2.72-.782.782L9 9.782l-2.72 2.72-.782-.782L8.218 9l-2.72-2.72.782-.782L9 8.218l2.72-2.72.782.782z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

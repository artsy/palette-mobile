import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const AddCircleIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm0 15.111A7.111 7.111 0 1 1 9 1.89 7.111 7.111 0 0 1 9 16.11zm.551-7.662H13V9.55H9.551V13H8.45V9.551H5V8.45h3.449V5H9.55v3.449z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

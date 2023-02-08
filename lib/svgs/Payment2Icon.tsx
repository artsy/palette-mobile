import { useColor } from "../hooks"
import { Icon, IconProps, Path } from "./Icon"

export const Payment2Icon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 3a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h15a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-15zM2 14V7h14v7H2zm0-8h14V4H2v2zm5 3H3v1h4V9z"
        fill={color(fill)}
      />
    </Icon>
  )
}

import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const CheckCircleFillIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 1a8 8 0 1 1 0 16A8 8 0 0 1 9 1zm4.32 5.796l-.764-.783-4.81 4.765-2.302-2.25-.782.783 3.085 3.067 5.573-5.582z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

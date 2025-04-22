import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const AlertIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M9 1.889A7.111 7.111 0 1 1 9 16.11 7.111 7.111 0 0 1 9 1.89zM9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm-.578 4.133h1.156l-.187 5.645H8.61l-.187-5.645zm0 6.525H9.57v1.209H8.44l-.018-1.21z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

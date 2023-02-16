import { G, Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const EditIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <G fill={color(fill)} fillRule="evenodd">
        <Path d="M3 3h6.992v1.009H4.008V14H14V8h1v7H3z" />
        <Path
          d="M6.007 9.299l6.908-7.18L15.809 5l-7.07 6.989H6.006V9.299zm1 1.691h1.32l6.062-5.991-1.459-1.454-5.923 6.156v1.289z"
          fillRule="nonzero"
        />
      </G>
    </Icon>
  )
}

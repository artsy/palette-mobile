import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const TrendingIcon = ({ fill, ...restprops }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restprops} viewBox="0 0 16 9">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6162 1L11.5 1V0H14.5H15.5V1V4H14.5V1.88393L8.94199 7.44194C8.69791 7.68602 8.30218 7.68602 8.05811 7.44194L5.50005 4.88388L1.44199 8.94194L0.558105 8.05806L5.05811 3.55806C5.30218 3.31398 5.69791 3.31398 5.94199 3.55806L8.50005 6.11612L13.6162 1Z"
        fill={color(fill)}
      />
    </Icon>
  )
}

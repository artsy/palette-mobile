import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

interface ArrowLeftIconProps extends IconProps {
  long?: boolean
}
export const ArrowLeftIcon = ({
  fill = "mono100",
  long = false,
  ...restProps
}: ArrowLeftIconProps) => {
  const color = useColor()

  if (long) {
    return (
      <Icon {...restProps} viewBox="0 0 24 24">
        <Path
          d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
          fill={color(fill)}
          fillRule="evenodd"
        />
      </Icon>
    )
  }
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M12.06 15.94L5.12 9l6.94-6.94.88.88L6.88 9l6.06 6.06z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

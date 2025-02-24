import { ChevronCircleLeftIcon } from "@artsy/icons/native"
import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

interface ArrowLeftIconProps extends IconProps {
  long?: boolean
}
export const ArrowLeftIcon = ({
  fill = "black100",
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
  return <ChevronCircleLeftIcon fill={color(fill)} {...restProps} />
}

import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const FullWidthIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 28 28">
      <Path
        d="M5.7779 3C5.34835 3 5.00012 3.34822 5.00012 3.77778V16.2222C5.00012 16.6518 5.34835 17 5.7779 17H21.3335C21.763 17 22.1112 16.6518 22.1112 16.2222V3.77778C22.1112 3.34822 21.763 3 21.3335 3H5.7779ZM6.55568 15.4444V4.55556H20.5557V15.4444H6.55568ZM5.7779 18.7778C5.34835 18.7778 5.00012 19.126 5.00012 19.5555V24H6.55568V20.3333H20.5557V24H22.1112V19.5555C22.1112 19.126 21.763 18.7778 21.3335 18.7778H5.7779Z"
        fill={color(fill)}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Icon>
  )
}

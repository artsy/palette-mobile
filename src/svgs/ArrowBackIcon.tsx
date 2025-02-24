import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArrowBackIcon = ({ fill = "black100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.91163 2.49087L2.24335 6.15914L5.91163 9.82742L5.37894 10.3601L1.17798 6.15914L5.37894 1.95818L5.91163 2.49087Z"
        fill={color(fill)}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.21411 5.60327H11.6098C14.4925 5.60327 16.8294 7.94017 16.8294 10.8229C16.8294 13.7056 14.4925 16.0425 11.6098 16.0425H5.98362V15.1503H11.5446C13.906 15.1503 15.8203 13.236 15.8203 10.8746C15.8203 8.51321 13.906 6.59891 11.5446 6.59891H2.21411V5.60327Z"
        fill={color(fill)}
      />
    </Icon>
  )
}

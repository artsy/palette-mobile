import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const SortIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M4.74201 4.42504L4.73353 14.4298L5.73338 14.4312L5.74257 4.42433L8.77818 7.45994L9.48529 6.75283L5.24265 2.51019L1 6.75283L1.70711 7.45994L4.74201 4.42504Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
      <Path
        d="M13.2371 3.59102L13.2286 13.5958L16.2635 10.5609L16.9706 11.268L12.728 15.5106L8.48535 11.268L9.19246 10.5609L12.2281 13.5965L12.2373 3.58961L13.2371 3.59102Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

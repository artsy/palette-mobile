import { G, Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const ArtsyMarkBlackIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 32 32">
      <G fill={color(fill)} fillRule="evenodd">
        <Path d="M0 31.963h31.876V.09H0v31.874zm29.583-2.293h-4.824v-6.283h-2.295v6.283H2.294V2.382h27.289V29.67z" />
        <Path d="M12.854 5.677h-2.53L5.64 17.737h2.422l1.265-3.382h4.541l1.247 3.382h2.424l-4.685-12.06zm-2.82 6.636l1.555-4.197 1.537 4.197h-3.093z" />
      </G>
    </Icon>
  )
}

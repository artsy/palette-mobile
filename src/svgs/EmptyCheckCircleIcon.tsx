import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const EmptyCheckCircleIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M1.0006 8.99993C1.0006 4.58165 4.58232 0.999931 9.00062 0.999931C11.1223 0.999931 13.1572 1.84278 14.6575 3.34307C16.1578 4.84337 17.0006 6.8782 17.0006 8.99993C17.0006 13.4182 13.4189 16.9999 9.00062 16.9999C4.58232 16.9999 1.0006 13.4182 1.0006 8.99993ZM16.1112 9.00007C16.1112 5.07273 12.9275 1.88898 9.00006 1.88898C5.07272 1.88898 1.88897 5.07273 1.88897 9.00007C1.88897 12.9275 5.07272 16.1112 9.00006 16.1112C12.9275 16.1112 16.1112 12.9275 16.1112 9.00007Z"
        fill={color(fill)}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Icon>
  )
}

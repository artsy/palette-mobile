import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const FireIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M4.125 9.57931C4.125 10.3351 4.30556 11.0384 4.66669 11.6894C5.02769 12.3404 5.52406 12.8654 6.15581 13.2644C6.10006 13.1587 6.06013 13.0531 6.036 12.9477C6.012 12.8425 6 12.7322 6 12.6168C6 12.2697 6.06663 11.9427 6.19988 11.636C6.333 11.3292 6.52406 11.0514 6.77306 10.8024L8.625 8.98081L10.4841 10.8024C10.7332 11.0514 10.9231 11.3292 11.0539 11.636C11.1846 11.9427 11.25 12.2697 11.25 12.6168C11.25 12.7322 11.238 12.8425 11.214 12.9477C11.1899 13.0531 11.1499 13.1587 11.0942 13.2644C11.7259 12.8654 12.2223 12.3404 12.5833 11.6894C12.9444 11.0384 13.125 10.3351 13.125 9.57931C13.125 8.95431 13.0094 8.36369 12.7781 7.80744C12.5469 7.25119 12.2125 6.75431 11.775 6.31681C11.525 6.47931 11.2625 6.60119 10.9875 6.68244C10.7125 6.76369 10.4313 6.80431 10.1438 6.80431C9.364 6.80431 8.68975 6.54806 8.121 6.03556C7.55225 5.52306 7.2265 4.887 7.14375 4.12737C6.65625 4.53512 6.225 4.96087 5.85 5.40462C5.475 5.84837 5.15938 6.30075 4.90313 6.76175C4.64688 7.22287 4.45312 7.69094 4.32188 8.16594C4.19063 8.64094 4.125 9.11206 4.125 9.57931ZM8.625 10.5543L7.55625 11.6043C7.41875 11.7418 7.3125 11.8981 7.2375 12.0731C7.1625 12.2481 7.125 12.4293 7.125 12.6168C7.125 13.0168 7.27188 13.3606 7.56563 13.6481C7.85938 13.9356 8.2125 14.0793 8.625 14.0793C9.0375 14.0793 9.39063 13.9356 9.68438 13.6481C9.97813 13.3606 10.125 13.0168 10.125 12.6168C10.125 12.4168 10.0875 12.2324 10.0125 12.0637C9.9375 11.8949 9.83125 11.7418 9.69375 11.6043L8.625 10.5543ZM8.25 2V3.80431C8.25 4.33506 8.43294 4.78025 8.79881 5.13987C9.16469 5.4995 9.613 5.67931 10.1438 5.67931C10.3735 5.67931 10.5925 5.63606 10.8007 5.54956C11.0089 5.46306 11.2 5.33562 11.3741 5.16725L11.7043 4.83425C12.4947 5.34 13.1166 6.01475 13.5699 6.8585C14.0233 7.70225 14.25 8.60919 14.25 9.57931C14.25 11.1486 13.7048 12.4784 12.6144 13.5687C11.5241 14.6591 10.1943 15.2043 8.625 15.2043C7.05575 15.2043 5.72594 14.6591 4.63556 13.5687C3.54519 12.4784 3 11.1486 3 9.57931C3 8.13031 3.47212 6.73606 4.41637 5.39656C5.36063 4.05719 6.6385 2.925 8.25 2Z"
        fillRule="nonzero"
        fill={color(fill)}
      />
    </Icon>
  )
}

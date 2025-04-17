import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const MoreIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 23 23">
      <Path
        d="M5.11112 9.58337C4.05258 9.58337 3.19446 10.4415 3.19446 11.5C3.19446 12.5586 4.05258 13.4167 5.11112 13.4167C6.16967 13.4167 7.02779 12.5586 7.02779 11.5C7.02779 10.4415 6.16967 9.58337 5.11112 9.58337ZM9.58335 11.5C9.58335 10.4415 10.4415 9.58337 11.5 9.58337C12.5586 9.58337 13.4167 10.4415 13.4167 11.5C13.4167 12.5586 12.5586 13.4167 11.5 13.4167C10.4415 13.4167 9.58335 12.5586 9.58335 11.5ZM15.9722 11.5C15.9722 10.4415 16.8304 9.58337 17.8889 9.58337C18.9474 9.58337 19.8056 10.4415 19.8056 11.5C19.8056 12.5586 18.9474 13.4167 17.8889 13.4167C16.8304 13.4167 15.9722 12.5586 15.9722 11.5Z"
        fill={color(fill ?? "onBackgroundMedium")}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Icon>
  )
}

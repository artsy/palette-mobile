import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const SecureLockIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()

  return (
    <Icon viewBox="0 0 24 24" {...restProps}>
      <Path
        fill={color(fill)}
        fillRule="evenodd"
        d="M8.928 5.29c-.49.608-.678 1.514-.678 2.71v1.5a.75.75 0 01-1.5 0V8c0-1.286.187-2.63 1.01-3.651C8.61 3.292 9.997 2.75 12 2.75s3.39.542 4.24 1.599c.823 1.02 1.01 2.365 1.01 3.651v1.5a.75.75 0 01-1.5 0V8c0-1.196-.188-2.102-.678-2.71-.462-.574-1.325-1.04-3.072-1.04s-2.61.466-3.072 1.04z"
        clipRule="evenodd"
      />
      <Path
        fill={color(fill)}
        fillRule="evenodd"
        d="M5.78 10.78c-.324.324-.53.965-.53 2.47v1.5c0 1.505.206 2.146.53 2.47.324.324.965.53 2.47.53h7.5c1.505 0 2.146-.206 2.47-.53.324-.324.53-.965.53-2.47v-1.5c0-1.505-.206-2.146-.53-2.47-.324-.324-.965-.53-2.47-.53h-7.5c-1.505 0-2.146.206-2.47.53zM4.72 9.72c.8-.801 2.035-.97 3.53-.97h7.5c1.495 0 2.73.169 3.53.97.801.8.97 2.035.97 3.53v1.5c0 1.495-.169 2.73-.97 3.53-.8.801-2.035.97-3.53.97h-7.5c-1.495 0-2.73-.169-3.53-.97-.801-.8-.97-2.035-.97-3.53v-1.5c0-1.495.169-2.73.97-3.53z"
        clipRule="evenodd"
      />
      <Path
        fill={color(fill)}
        fillRule="evenodd"
        d="M11.95 11.5c-.992 0-1.75.751-1.75 1.733 0 .751.525 1.387 1.225 1.618V16.122c0 .347.233.578.583.578s.584-.231.584-.578V14.851a1.71 1.71 0 001.108-1.618c0-.982-.758-1.733-1.75-1.733zm0 1.156c.35 0 .583.23.583.577s-.233.578-.583.578-.583-.231-.583-.578c0-.346.291-.577.583-.577z"
        clipRule="evenodd"
      />
    </Icon>
  )
}

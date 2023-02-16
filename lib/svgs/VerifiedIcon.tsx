import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const VerifiedIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M5.2 3.08l-.5 1.18a.85.85 0 01-.44.44l-1.17.5a1.78 1.78 0 00-.96 2.3l.48 1.18a.84.84 0 010 .63l-.48 1.19c-.36.9.06 1.92.95 2.3l1.18.5c.2.08.36.24.44.44l.5 1.18a1.78 1.78 0 002.3.95l1.18-.48a.84.84 0 01.64 0l1.18.48a1.78 1.78 0 002.3-.95l.5-1.18a.85.85 0 01.44-.44l1.17-.5a1.78 1.78 0 00.96-2.3l-.48-1.18a.85.85 0 010-.63l.48-1.19c.36-.9-.06-1.92-.96-2.3l-1.17-.5a.85.85 0 01-.44-.44l-.5-1.17A1.78 1.78 0 0011.16 2c-.22 0-.45.04-.66.13l-1.18.48a.85.85 0 01-.63 0L7.5 2.13a1.78 1.78 0 00-2.3.95zm4.47.4L10.85 3a.84.84 0 011.09.45l.5 1.17c.17.43.51.76.94.95l1.17.5A.84.84 0 0115 7.14l-.47 1.18a1.78 1.78 0 000 1.34l.47 1.18a.84.84 0 01-.45 1.09l-1.17.5c-.43.17-.76.51-.95.94l-.5 1.17a.84.84 0 01-1.08.45l-1.18-.48a1.78 1.78 0 00-1.34 0L7.15 15a.84.84 0 01-1.09-.45l-.5-1.17a1.78 1.78 0 00-.94-.95l-1.17-.5A.84.84 0 013 10.86l.48-1.18a1.78 1.78 0 000-1.34L3 7.15a.84.84 0 01.45-1.09l1.17-.5c.43-.17.77-.51.95-.94l.5-1.17A.84.84 0 017.14 3l1.18.47a1.78 1.78 0 001.34 0zm1.74 3.38L8.1 10.17 6.78 8.85a.56.56 0 10-.8.79l1.72 1.72c.22.22.58.22.8 0l3.7-3.7a.56.56 0 000-.8.56.56 0 00-.79 0z"
        fillRule="evenodd"
        fill={color(fill) || color("onBackground")}
      />
    </Icon>
  )
}

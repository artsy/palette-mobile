import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const FacebookIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M8.98158 0C4.0348 0 0 4.06601 0 9.05106C0 13.4141 3.08598 17.1552 7.33265 17.9536L7.59058 18V11.6689H5.30604V9.05106H7.59058V7.05518C7.59058 5.95977 7.913 5.05003 8.52098 4.44662C9.11054 3.8525 9.96725 3.53687 10.9898 3.53687C11.4964 3.53687 12.0215 3.58329 12.3623 3.62971C12.5558 3.64827 12.7124 3.67612 12.8229 3.68541L12.9703 3.70397L12.998 5.94121H11.8649C11.349 5.94121 10.9621 6.08974 10.7134 6.37751C10.5107 6.61888 10.4002 6.95307 10.4002 7.35224V9.05106H12.8966L12.5005 11.6689H10.4094V18L10.6673 17.9536C14.914 17.1552 18 13.4141 18 9.05106C17.9724 4.06601 13.9376 0 8.98158 0Z"
        fill={color(fill)}
        fillRule="evenodd"
      />
    </Icon>
  )
}

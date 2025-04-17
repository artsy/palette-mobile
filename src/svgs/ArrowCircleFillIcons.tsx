import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

const FilledArrowCircle = ({
  fill = "mono100",
  rotate,
  ...restProps
}: IconProps & { rotate?: string }) => {
  const color = useColor()
  return (
    <Icon
      {...restProps}
      style={rotate !== undefined ? { transform: [{ rotate }] } : {}}
      viewBox="0 0 18 18"
    >
      <Path
        d="M16 9.5C16 13.366 12.866 16.5 9 16.5C5.13401 16.5 2 13.366 2 9.5C2 5.63401 5.13401 2.5 9 2.5C12.866 2.5 16 5.63401 16 9.5Z M9 6.5002L6 11.7002L12 11.7002L9 6.5002Z"
        fill={color(fill)}
      />
    </Icon>
  )
}

export const ArrowUpCircleFillIcon = (props: IconProps) => <FilledArrowCircle {...props} />

export const ArrowDownCircleFillIcon = (props: IconProps) => (
  <FilledArrowCircle rotate="180deg" {...props} />
)

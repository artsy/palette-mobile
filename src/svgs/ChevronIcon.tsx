import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

type Direction = "left" | "right" | "up" | "down"

export const ChevronRightIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M6.62132 3L12.5 9L6.62132 15L5.5 13.8555L10.2574 9L5.5 4.14446L6.62132 3Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

export const ChevronUpIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M3 11.3787L9 5.5L15 11.3787L13.8555 12.5L9 7.74264L4.14446 12.5L3 11.3787Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

export const ChevronLeftIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M11.3787 15L5.5 9L11.3787 3L12.5 4.14446L7.74264 9L12.5 13.8555L11.3787 15Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

export const ChevronDownIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18">
      <Path
        d="M15 6.62132L9 12.5L3 6.62132L4.14446 5.5L9 10.2574L13.8555 5.5L15 6.62132Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

const directionMap = {
  left: ChevronLeftIcon,
  right: ChevronRightIcon,
  up: ChevronUpIcon,
  down: ChevronDownIcon,
}

interface ChevronProps extends IconProps {
  direction?: Direction
}

export const ChevronIcon = ({ direction = "right", ...restProps }: ChevronProps) => {
  const Arrow = directionMap[direction]
  return <Arrow {...restProps} />
}

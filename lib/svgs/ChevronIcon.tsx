import { ArrowDownIcon } from "./ArrowDownIcon"
import { ArrowLeftIcon } from "./ArrowLeftIcon"
import { ArrowRightIcon } from "./ArrowRightIcon"
import { ArrowUpIcon } from "./ArrowUpIcon"
import { IconProps } from "./Icon"

type Direction = "left" | "right" | "up" | "down"

const directionMap = {
  left: ArrowLeftIcon,
  right: ArrowRightIcon,
  up: ArrowUpIcon,
  down: ArrowDownIcon,
}

interface ChevronProps extends IconProps {
  direction?: Direction
}

export const ChevronIcon = ({ direction = "right", ...restProps }: ChevronProps) => {
  const Arrow = directionMap[direction]
  return <Arrow {...restProps} />
}

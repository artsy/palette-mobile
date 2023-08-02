import { Color } from "@artsy/palette-tokens"
import themeGet from "@styled-system/theme-get"
import { MotiPressable, MotiPressableProps } from "moti/interactions"
import styled, { FlattenInterpolation, css } from "styled-components"
import { CloseIcon } from "../../svgs"
import { IconProps } from "../../svgs/Icon"
import { Flex, FlexProps } from "../Flex"
import { Image } from "../Image"
import { Text } from "../Text"

export const PILL_VARIANT_NAMES = ["default", "search", "filter", "artist", "badge"] as const
export type PillState = "default" | "selected" | "disabled"
export type PillVariant = typeof PILL_VARIANT_NAMES[number]

export type PillProps = (FlexProps & {
  selected?: boolean
  disabled?: boolean
  Icon?: React.FC<IconProps>
  onPress?: MotiPressableProps["onPress"]
}) &
  (
    | { variant?: Extract<PillVariant, "default" | "filter" | "badge" | "search">; src?: never }
    | { variant: Extract<PillVariant, "artist">; src?: string }
  )

export const Pill: React.FC<PillProps> = ({
  variant = "default",
  src,
  selected,
  disabled,
  Icon,
  children,
  onPress,
  ...rest
}) => {
  const stateString = selected ? "selected" : disabled ? "disabled" : "default"
  const color = TEXT_COLOR[variant][stateString]

  return (
    <Flex {...rest}>
      <Container variant={variant} selected={selected} disabled={disabled} onPress={onPress}>
        {variant === "artist" && (
          <Thumbnail src={src!} height={30} width={30} style={{ overflow: "hidden" }} />
        )}
        {Icon && <Icon fill={color} ml={-0.5} mr={0.5} />}

        <Text variant="xs" color={color}>
          {children}
        </Text>

        {((variant === "filter" && !disabled) || (variant === "artist" && selected)) && (
          <CloseIcon fill={color} ml={0.5} width={15} height={15} />
        )}
      </Container>
    </Flex>
  )
}

const Container = styled(MotiPressable)<MotiPressableProps & PillProps>`
  align-items: center;
  border: 1px solid ${themeGet("colors.black15")};
  flex-direction: row;
  justify-content: center;
  text-align: center;
  padding: 20px;

  ${(props) => {
    const states = PILL_VARIANTS[props.variant!]

    return css`
      ${states.default}
      ${props.selected && states.selected}
      ${props.disabled && states.disabled}
    `
  }}
`

const Thumbnail = styled(Image)`
  background-color: ${themeGet("colors.black30")};
  border-radius: 50px;
  margin-right: ${themeGet("space.1")};
`

const PILL_STATES = {
  default: css`
    border-radius: 15px;
    height: 30px;
    padding: 0 ${themeGet("space.2")};
  `,
  selected: css`
    border-color: ${themeGet("colors.blue100")};
    background-color: ${themeGet("colors.blue100")};
  `,
  disabled: css`
    background-color: ${themeGet("colors.black5")};
    border-color: ${themeGet("colors.black5")};
  `,
}

const PILL_VARIANTS: Record<PillVariant, Record<PillState, FlattenInterpolation<any>>> = {
  default: PILL_STATES,
  search: {
    ...PILL_STATES,
    default: css`
      ${PILL_STATES.default}
    `,
  },
  artist: {
    default: css`
      border-radius: 25px;
      height: 50px;
      padding: 0 ${themeGet("space.2")} 0 ${themeGet("space.1")};
    `,
    selected: css`
      border-color: ${themeGet("colors.blue100")};
    `,
    disabled: css``,
  },
  badge: {
    default: css`
      border-radius: 15px;
      height: 30px;
      padding: 0 15px;
      background-color: ${themeGet("colors.blue10")};
      border-color: ${themeGet("colors.blue10")};
    `,
    selected: css`
      background-color: ${themeGet("colors.blue150")};
      border-color: ${themeGet("colors.blue150")};
    `,
    disabled: css`
      background-color: ${themeGet("colors.blue10")};
      border-color: ${themeGet("colors.blue10")};
    `,
  },
  filter: {
    ...PILL_STATES,
    default: css`
      height: 30px;
      padding: 0 ${themeGet("space.1")};
    `,
    disabled: css`
      border-color: ${themeGet("colors.black60")};
    `,
  },
}

const defaultColors: Record<PillState, Color> = {
  default: "black100",
  selected: "white100",
  disabled: "black60",
}
const TEXT_COLOR: Record<PillVariant, Record<PillState, Color>> = {
  default: defaultColors,
  search: defaultColors,
  artist: {
    ...defaultColors,
    selected: "black100",
  },
  badge: {
    default: "blue100",
    selected: "white100",
    disabled: "blue100",
  },
  filter: {
    ...defaultColors,
    disabled: "black100",
  },
}

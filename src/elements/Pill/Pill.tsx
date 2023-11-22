import { Color } from "@artsy/palette-tokens"
import themeGet from "@styled-system/theme-get"
import { MotiPressable, MotiPressableProps } from "moti/interactions"
import { useMemo } from "react"
import styled, { FlattenInterpolation, css } from "styled-components"
import { CloseIcon } from "../../svgs"
import { IconProps } from "../../svgs/Icon"
import { Flex, FlexProps } from "../Flex"
import { Image } from "../Image"
import { Text } from "../Text"

export const PILL_VARIANT_NAMES = [
  "badge",
  "default",
  "dotted",
  "filter",
  "profile",
  "search",
] as const
export type PillState = "default" | "selected" | "disabled"
export type PillVariant = typeof PILL_VARIANT_NAMES[number]

export type PillProps = (FlexProps & {
  selected?: boolean
  disabled?: boolean
  Icon?: React.FC<IconProps>
  onPress?: MotiPressableProps["onPress"]
}) &
  (
    | {
        variant?: Extract<PillVariant, "default" | "filter" | "badge" | "search" | "dotted">
        src?: never
      }
    | { variant: Extract<PillVariant, "profile">; src?: string }
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
  const showCloseIcon =
    (variant === "filter" && !disabled) || (["profile"].includes(variant) && selected)

  return (
    <Flex {...rest}>
      <Container
        variant={variant}
        selected={selected}
        disabled={disabled}
        onPress={onPress}
        animate={useMemo(
          () =>
            ({ hovered, pressed }) => {
              "worklet"

              return {
                opacity: hovered || pressed ? 0.5 : 1,
              }
            },
          []
        )}
      >
        {variant === "profile" && src && (
          <Flex overflow="hidden" borderRadius={50} height={30} width={30} mr={1}>
            <Thumbnail src={src} height={30} width={30} />
          </Flex>
        )}
        {Icon && <Icon fill={color} ml={-0.5} mr={0.5} />}

        <Text variant="xs" color={color} style={{ marginBottom: 2 }}>
          {children}
        </Text>

        {showCloseIcon && <CloseIcon fill={color} ml={0.5} width={15} height={15} />}
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
  dotted: {
    ...PILL_STATES,
    default: css`
      ${PILL_STATES.default}
      border-style: dashed;
    `,
    selected: css`
      ${PILL_STATES.selected}
      background-color: ${themeGet("colors.black60")};
      border-color: ${themeGet("colors.black60")};
    `,
  },
  search: {
    ...PILL_STATES,
    default: css`
      ${PILL_STATES.default}
    `,
  },
  profile: {
    default: css`
      background-color: ${themeGet("colors.black5")};
      border-color: ${themeGet("colors.black5")};
      border-radius: 25px;
      height: 50px;
      padding: 0 ${themeGet("space.1")}};
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
  dotted: defaultColors,
  search: defaultColors,
  profile: {
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

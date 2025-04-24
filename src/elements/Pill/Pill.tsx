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
  "onboarding",
  "link",
] as const
export type PillState = "default" | "selected" | "disabled"
export type PillVariant = (typeof PILL_VARIANT_NAMES)[number]

export type PillProps = (FlexProps & {
  selected?: boolean
  disabled?: boolean
  Icon?: React.FC<IconProps>
  onPress?: MotiPressableProps["onPress"]
}) &
  (
    | {
        variant?: Extract<PillVariant, keyof typeof PILL_VARIANTS>
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
  border: 1px solid ${themeGet("colors.mono15")};
  flex-direction: row;
  justify-content: center;
  text-align: center;

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
  background-color: ${themeGet("colors.mono30")};
`

const PILL_STATES = {
  default: css`
    border-radius: 15px;
    height: 30px;
    padding: 0 15px;
  `,
  selected: css`
    border-color: ${themeGet("colors.blue100")};
    background-color: ${themeGet("colors.blue100")};
  `,
  disabled: css`
    background-color: ${themeGet("colors.mono5")};
    border-color: ${themeGet("colors.mono5")};
  `,
}

const PILL_VARIANTS: Record<PillVariant, Record<PillState, FlattenInterpolation<any>>> = {
  default: PILL_STATES,
  onboarding: {
    ...PILL_STATES,
    default: css`
      ${PILL_STATES.default}
      border-radius: 20px;
      height: 40px;
      border-color: ${themeGet("colors.mono60")};
    `,
  },
  dotted: {
    ...PILL_STATES,
    default: css`
      ${PILL_STATES.default}
      border-style: dashed;
    `,
    selected: css`
      ${PILL_STATES.selected}
      background-color: ${themeGet("colors.mono10")};
      border-color: ${themeGet("colors.mono10")};
    `,
  },
  search: {
    ...PILL_STATES,
  },
  profile: {
    ...PILL_STATES,
    default: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      border-radius: 25px;
      height: 50px;
      padding: 0 ${themeGet("space.1")}};
    `,
    selected: css`
      border-color: ${themeGet("colors.blue100")};
    `,
  },
  badge: {
    default: css`
      ${PILL_STATES.default}
      border-radius: 15px;
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
      border-color: ${themeGet("colors.mono60")};
    `,
  },
  link: {
    ...PILL_STATES,
    default: css`
      ${PILL_STATES.default}
      border-color: ${themeGet("colors.mono5")};
      background-color: ${themeGet("colors.mono5")};
    `,
  },
}

const defaultColors: Record<PillState, Color> = {
  default: "mono100",
  // @ts-expect-error We want to set the color to white here regardless of the theme
  selected: "white",
  disabled: "mono60",
}
const TEXT_COLOR: Record<PillVariant, Record<PillState, Color>> = {
  default: defaultColors,
  onboarding: defaultColors,
  dotted: {
    ...defaultColors,
    selected: "mono100",
  },
  search: defaultColors,
  profile: {
    ...defaultColors,
    selected: "mono100",
  },
  badge: {
    default: "blue100",
    selected: "mono0",
    disabled: "blue100",
  },
  filter: {
    ...defaultColors,
    disabled: "mono100",
  },
  link: defaultColors,
}

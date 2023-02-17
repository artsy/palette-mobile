import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components/native"
import { Box, BoxProps, Flex, FlexProps, useColor } from "../.."

type RadioDotMode = "default" | "disabled" | "error" | "hover"

export const useColorsForRadioMode = (): Record<
  RadioDotMode,
  { resting: FlexProps; selected: FlexProps }
> => {
  const color = useColor()

  return {
    default: {
      resting: {
        borderWidth: 2,
        borderColor: color("black10"),
      },
      selected: {
        borderWidth: 2,
        borderColor: color("black100"),
        backgroundColor: color("black100"),
      },
    },
    disabled: {
      resting: {
        borderWidth: 2,
        borderColor: color("black10"),
        backgroundColor: color("black10"),
      },
      selected: {
        borderWidth: 2,
        borderColor: color("black10"),
        backgroundColor: color("black10"),
      },
    },
    error: {
      resting: {
        borderWidth: 2,
        borderColor: color("red100"),
      },
      selected: {
        borderWidth: 2,
        borderColor: color("black100"),
        backgroundColor: color("black100"),
      },
    },
    hover: {
      resting: {
        borderWidth: 2,
        borderColor: color("black10"),
        backgroundColor: color("black10"),
      },
      selected: {
        borderWidth: 2,
        borderColor: color("black100"),
        backgroundColor: color("black100"),
      },
    },
  }
}

interface RadioDotProps {
  disabled?: boolean
  error?: boolean
  hover?: boolean
  selected?: boolean
}

export const RadioDot = (props: RadioDotProps) => (
  <Container {...props}>
    <Dot {...props} />
  </Container>
)

const Container = (props: RadioDotProps) => {
  const colors = useColorsForRadioMode()

  const mode = (() => {
    switch (true) {
      case props.disabled:
        return colors.disabled
      case props.hover:
        return colors.hover
      case props.error:
        return colors.error
      default:
        return colors.default
    }
  })()
  const moreProps = props.selected ? mode.selected : mode.resting

  return (
    <Flex
      width={20}
      height={20}
      borderRadius={50}
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      {...moreProps}
    />
  )
}

const Dot = styled(Box)<RadioDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${(props) => {
    if (props.disabled && !props.selected) {
      return css`
        background-color: transparent;
      `
    }

    return css`
      background-color: ${themeGet("colors.white100")};
    `
  }};
`

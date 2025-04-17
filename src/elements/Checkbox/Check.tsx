import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components/native"
import { CheckIcon } from "../../svgs/CheckIcon"
import { Box } from "../Box"

export const CHECK_SIZE = 22

const CHECK_MODES = {
  default: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.mono10")};
    `,
    selected: css`
      background-color: ${themeGet("colors.mono100")};
      border-color: ${themeGet("colors.mono100")};
    `,
  },
  disabled: {
    resting: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono10")};
    `,
    selected: css`
      background-color: ${themeGet("colors.mono30")};
      border-color: ${themeGet("colors.mono30")};
    `,
  },
  error: {
    resting: css`
      background-color: ${themeGet("colors.mono0")};
      border-color: ${themeGet("colors.red100")};
    `,
    selected: css`
      background-color: ${themeGet("colors.mono100")};
      border-color: ${themeGet("colors.mono100")};
    `,
  },
} as const

export interface CheckProps {
  disabled?: boolean
  error?: boolean
  hover?: boolean
  selected?: boolean
  testID?: string
}

/** Toggeable check mark */
export const Check: React.FC<CheckProps> = ({ disabled, selected, testID, ...rest }) => {
  return (
    <Container
      disabled={disabled}
      selected={selected}
      {...rest}
      aria-disabled={disabled}
      aria-checked={selected}
      accessibilityRole="checkbox"
      testID={testID}
    >
      {!!selected && <CheckIcon fill="mono0" />}
    </Container>
  )
}

const Container = styled(Box)<CheckProps>`
  width: ${CHECK_SIZE}px;
  height: ${CHECK_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 1px;

  ${(props) => {
    const mode = (() => {
      switch (true) {
        case props.error:
          return CHECK_MODES.error
        case props.disabled:
          return CHECK_MODES.disabled
        default:
          return CHECK_MODES.default
      }
    })()

    return props.selected ? mode.selected : mode.resting
  }};
`

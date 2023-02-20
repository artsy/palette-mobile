import { FlexProps, Flex } from "../Flex"

type RadioDotMode = "default" | "disabled" | "error" | "hover"

export const RADIO_DOT_MODES: Record<RadioDotMode, { resting: FlexProps; selected: FlexProps }> = {
  default: {
    resting: {
      borderWidth: 2,
      borderColor: "black10",
    },
    selected: {
      borderWidth: 2,
      borderColor: "black100",
      backgroundColor: "black100",
    },
  },
  disabled: {
    resting: {
      borderWidth: 2,
      borderColor: "black10",
      backgroundColor: "black10",
    },
    selected: {
      borderWidth: 2,
      borderColor: "black10",
      backgroundColor: "black10",
    },
  },
  error: {
    resting: {
      borderWidth: 2,
      borderColor: "red100",
    },
    selected: {
      borderWidth: 2,
      borderColor: "black100",
      backgroundColor: "black100",
    },
  },
  hover: {
    resting: {
      borderWidth: 2,
      borderColor: "black10",
      backgroundColor: "black10",
    },
    selected: {
      borderWidth: 2,
      borderColor: "black100",
      backgroundColor: "black100",
    },
  },
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

const Container = ({
  selected = false,
  hover = false,
  error = false,
  disabled = false,
}: RadioDotProps) => {
  const mode = (() => {
    switch (true) {
      case disabled:
        return RADIO_DOT_MODES.disabled
      case hover:
        return RADIO_DOT_MODES.hover
      case error:
        return RADIO_DOT_MODES.error
      default:
        return RADIO_DOT_MODES.default
    }
  })()
  const moreProps = selected ? mode.selected : mode.resting

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

const Dot = ({ selected = false, disabled = false }: RadioDotProps) => (
  <Flex
    width={10}
    height={10}
    borderRadius={50}
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
    backgroundColor={disabled && !selected ? "transparent" : "white100"}
  />
)

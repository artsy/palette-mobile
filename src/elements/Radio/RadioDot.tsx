import { FlexProps, Flex } from "../Flex"

type RadioDotMode = "default" | "disabled" | "error" | "hover"

const INACTIVE_BORDER_WIDTH = 2
const ACTIVE_BORDER_WIDTH = 4

export const RADIO_DOT_MODES: Record<RadioDotMode, { resting: FlexProps; selected: FlexProps }> = {
  default: {
    resting: {
      borderWidth: INACTIVE_BORDER_WIDTH,
      borderColor: "mono30",
    },
    selected: {
      borderWidth: ACTIVE_BORDER_WIDTH,
      borderColor: "mono100",
    },
  },
  disabled: {
    resting: {
      borderWidth: INACTIVE_BORDER_WIDTH,
      borderColor: "mono10",
    },
    selected: {
      borderWidth: ACTIVE_BORDER_WIDTH,
      borderColor: "mono10",
    },
  },
  error: {
    resting: {
      borderWidth: INACTIVE_BORDER_WIDTH,
      borderColor: "red100",
    },
    selected: {
      borderWidth: ACTIVE_BORDER_WIDTH,
      borderColor: "mono100",
    },
  },
  hover: {
    resting: {
      borderWidth: INACTIVE_BORDER_WIDTH,
      borderColor: "mono10",
    },
    selected: {
      borderWidth: INACTIVE_BORDER_WIDTH,
      borderColor: "mono100",
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
    <Dot />
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

const Dot: React.FC<{}> = () => (
  <Flex
    width={12}
    height={12}
    borderRadius={50}
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
  />
)

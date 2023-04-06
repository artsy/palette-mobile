import { StyleProp, ViewStyle } from "react-native"
import { useColor } from "../../utils/hooks/useColor"
import { Flex } from "../Flex"

const DOT_DIAMETER = 6

interface VisualClueDotProps {
  diameter?: number
  style?: StyleProp<ViewStyle>
}

export const VisualClueDot: React.FC<VisualClueDotProps> = ({ diameter = DOT_DIAMETER, style }) => {
  const color = useColor()

  return (
    <Flex
      style={{
        height: diameter,
        minWidth: diameter,
        borderRadius: diameter / 2,
        backgroundColor: color("blue100"),
        ...(style as object),
      }}
    />
  )
}

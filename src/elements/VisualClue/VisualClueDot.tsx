import { StyleProp, ViewStyle } from "react-native"
import { Color } from "../../types"
import { useColor } from "../../utils/hooks/useColor"
import { Flex } from "../Flex"

const DOT_DIAMETER = 6
const FILL_COLOR: Color = "blue100"

interface VisualClueDotProps {
  diameter?: number
  color?: Color
  style?: StyleProp<ViewStyle>
}

export const VisualClueDot: React.FC<VisualClueDotProps> = ({
  diameter = DOT_DIAMETER,
  color = FILL_COLOR,
  style,
}) => {
  const colors = useColor()

  return (
    <Flex
      style={{
        height: diameter,
        minWidth: diameter,
        borderRadius: diameter / 2,
        backgroundColor: colors(color),
        ...(style as object),
      }}
    />
  )
}

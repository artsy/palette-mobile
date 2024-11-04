import { LinearGradient } from "expo-linear-gradient"
import { SCREEN_HORIZONTAL_PADDING } from "./constants"
import { useColor } from "../../utils/hooks/useColor"
import { Flex } from "../Flex"

export interface BottomViewProps {
  children: React.ReactNode
  darkMode?: boolean
}

export const BottomView: React.FC<BottomViewProps> = ({ children, darkMode }) => {
  const color = useColor()

  return (
    <>
      <LinearGradient
        colors={[darkMode ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)", color("background")]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          width: "100%",
          height: 20,
        }}
        pointerEvents="none"
      />
      <Flex px={SCREEN_HORIZONTAL_PADDING} pt={1} pb={4} backgroundColor="background">
        {children}
      </Flex>
    </>
  )
}

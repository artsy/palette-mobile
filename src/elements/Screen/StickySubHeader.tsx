import { MotiView } from "moti"
import React from "react"
import { useScreenScrollContext } from "./ScreenScrollContext"
import { NAVBAR_HEIGHT } from "./constants"
import { Flex } from "../Flex"
import { Separator } from "../Separator"
import { Text } from "../Text"

export interface StickySubHeaderProps extends React.PropsWithChildren<{}> {
  title: string
}

const STICKY_BAR_HEIGHT = 60

export const StickySubHeader: React.FC<StickySubHeaderProps> = ({ title, children }) => {
  const { currentScrollY, scrollYOffset = 0 } = useScreenScrollContext()

  const visible = currentScrollY >= NAVBAR_HEIGHT + scrollYOffset ? false : true

  return (
    <Flex>
      <MotiView
        animate={{
          height: visible ? STICKY_BAR_HEIGHT : 0,
          opacity: visible ? 1 : 0,
          transform: [{ translateY: visible ? 0 : -STICKY_BAR_HEIGHT }],
        }}
        transition={{
          type: "timing",
          duration: 200,
        }}
      >
        <Text variant="lg-display" numberOfLines={1} px={2}>
          {title}
        </Text>
      </MotiView>
      {children}
      <Separator borderColor="black10" />
    </Flex>
  )
}

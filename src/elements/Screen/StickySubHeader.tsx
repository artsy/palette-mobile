import { MotiView } from "moti"
import React, { useState } from "react"
import { LayoutChangeEvent } from "react-native"
import { useScreenScrollContext } from "./ScreenScrollContext"
import { NAVBAR_HEIGHT } from "./constants"
import { useSpace } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Separator } from "../Separator"
import { Text } from "../Text"

export interface StickySubHeaderProps extends React.PropsWithChildren<{}> {
  title: string
  subTitle?: string
}

const STICKY_BAR_HEIGHT = 52

export const StickySubHeader: React.FC<StickySubHeaderProps> = ({ title, subTitle, children }) => {
  const { currentScrollY, scrollYOffset = 0 } = useScreenScrollContext()
  const space = useSpace()

  const [stickyBarHeight, setStickyHeaderHeight] = useState<null | number>(null)
  const visible = currentScrollY >= NAVBAR_HEIGHT + scrollYOffset ? false : true

  const handleLayout = (event: LayoutChangeEvent) => {
    setStickyHeaderHeight(event.nativeEvent.layout.height)
  }

  // The styles are kept in a variable to make sure they're always in sync with the hidden text component
  const styles = {
    paddingVertical: space(1),
    paddingHorizontal: space(2),
  }

  return (
    <Flex>
      {/* We only want this on mount in order to calculate sticky header height */}
      {stickyBarHeight === null && (
        <Flex
          onLayout={(event) => handleLayout(event)}
          position="absolute"
          backgroundColor="white100"
          zIndex={-1000}
          style={styles}
        >
          <Text variant="lg-display" color="white100">
            {title}
          </Text>
          {subTitle && (
            <Text variant="xs" mt={0.5} color="white100">
              {subTitle}
            </Text>
          )}
        </Flex>
      )}

      <MotiView
        animate={{
          height: visible ? stickyBarHeight || undefined : 0,
          transform: [{ translateY: visible ? 0 : -(stickyBarHeight || STICKY_BAR_HEIGHT) }],
        }}
        style={styles}
        transition={{
          type: "timing",
          duration: 100,
        }}
      >
        {/* If we don't specify a height for the text, we will get text jumps as the parent component height changes  */}
        <Flex style={{ height: stickyBarHeight }}>
          <Text variant="lg-display">{title}</Text>
          {subTitle && (
            <Text variant="xs" mt={0.5}>
              {subTitle}
            </Text>
          )}
        </Flex>
      </MotiView>

      {children}
      <Separator borderColor="black10" />
    </Flex>
  )
}

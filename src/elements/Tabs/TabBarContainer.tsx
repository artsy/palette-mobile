import { compact } from "lodash"
import { useEffect, useRef } from "react"
import { Animated, LayoutRectangle, ScrollView, View } from "react-native"
import { useColor } from "../../utils/hooks"
import { useScreenDimensions } from "../../utils/hooks/useScreenDimensions"
import { Box } from "../Box"

export const TAB_BAR_HEIGHT = 48

export interface TabBarContainerProps {
  children: React.ReactNode
  activeTabIndex: number
  scrollEnabled: boolean
  tabLayouts: Array<LayoutRectangle | null>
}

/**
 * Wraps the respective tabs. Based on StickyTabPageTabBar
 * Usage: ```
 * <TabBarContainer>{props.tabs.map((tab) => <Tab {...tab} />)}</TabContainer>
 * ```
 */
export const TabBarContainer = ({
  children,
  activeTabIndex,
  scrollEnabled,
  tabLayouts,
}: TabBarContainerProps) => {
  const color = useColor()
  const screen = useScreenDimensions()

  const allTabLayoutsArePresent = tabLayouts.every((l) => l)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (allTabLayoutsArePresent) {
      // attempt to center the active tab
      let left = 0
      for (let i = 0; i < activeTabIndex; i++) {
        left += tabLayouts[i]!.width
      }
      const center = left + tabLayouts[activeTabIndex]!.width / 2
      const scrollLeft = center - screen.width / 2
      scrollViewRef.current?.scrollTo({ x: scrollLeft })
    }
  }, [activeTabIndex])

  return (
    <Box>
      <ScrollView
        scrollEnabled={scrollEnabled}
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minWidth: "100%" }}
      >
        {/* bottom border */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 1,
            borderBottomColor: color("black30"),
          }}
        />
        <View
          style={{
            flex: 1,
            minWidth: "100%",
            height: TAB_BAR_HEIGHT,
            flexDirection: "row",
          }}
        >
          {children}
          {!!allTabLayoutsArePresent && (
            <ActiveTabBorder tabLayouts={compact(tabLayouts)} activeTabIndex={activeTabIndex} />
          )}
        </View>
      </ScrollView>
    </Box>
  )
}

export function spring(node: Animated.Value, toValue: number) {
  return Animated.spring(node, { toValue, useNativeDriver: true, bounciness: -7, speed: 13 })
}

/**
 * Underlines the Active Tab. Same implementation in StickyTabPageTabBar
 */
export const ActiveTabBorder = ({
  tabLayouts,
  activeTabIndex,
}: {
  tabLayouts: LayoutRectangle[]
  activeTabIndex: number
}) => {
  const color = useColor()
  // We resize this border using the `scaleX` transform property rather than the `width` property, to avoid running
  // animations on the JS thread, so we need to set an initial, pre-transform span for the border.
  const preTransformSpan = 100

  const span = tabLayouts[activeTabIndex].width

  let left = 0
  for (let i = 0; i < activeTabIndex; i++) {
    left += tabLayouts[i].width
  }

  const translateX = useRef(new Animated.Value(left)).current
  const scaleX = useRef(new Animated.Value(span / preTransformSpan)).current

  useEffect(() => {
    Animated.parallel([spring(translateX, left), spring(scaleX, span / preTransformSpan)]).start()
  }, [left, span])

  const scaleXOffset = Animated.divide(
    Animated.subtract(preTransformSpan, Animated.multiply(scaleX, preTransformSpan)),
    2
  )

  return (
    <Animated.View
      style={{
        height: 1,
        width: preTransformSpan,
        backgroundColor: color("black100"),
        position: "absolute",
        bottom: 0,
        transform: [
          {
            translateX: Animated.subtract(translateX, scaleXOffset),
          },
          {
            scaleX,
          },
        ],
      }}
    />
  )
}

import { MotiView, View } from "moti"
import { Platform } from "react-native"
import { useCurrentTabScrollY, useHeaderMeasurements } from "react-native-collapsible-tab-view"
import { useAnimatedStyle } from "react-native-reanimated"
import { useSpace } from "../../utils/hooks/useSpace"
import { Flex } from "../Flex"

/**
 * Use to position content directly below the tab bar, and for it to stick while
 * scrolling in the subview.
 *
 * Note: On Android, it will be static and will not stick to the top of the screen.
 */
export const SubTabBar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  if (Platform.OS === "android") {
    return <SubTabBarAndroid>{children}</SubTabBarAndroid>
  }

  return <SubTabBarIOS>{children}</SubTabBarIOS>
}

export const SubTabBarAndroid = ({ children }: React.PropsWithChildren<{}>) => {
  const space = useSpace()

  return <Flex style={[{ zIndex: 1, marginHorizontal: -space(2) }]}>{children}</Flex>
}

export const SubTabBarIOS = ({ children }: React.PropsWithChildren<{}>) => {
  const { top } = useHeaderMeasurements()
  const scrollY = useCurrentTabScrollY()
  const space = useSpace()

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value + top.value,
        },
      ],
    }
  }, [])

  return <MotiView style={[style, { zIndex: 1, marginHorizontal: -space(2) }]}>{children}</MotiView>
}

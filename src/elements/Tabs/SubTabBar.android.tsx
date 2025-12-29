import { View } from "react-native"
import { useSpace } from "../../utils/hooks/useSpace"

/**
 * Use to position content directly below the tab bar
 * on android this is a simple view that is positioned absolutely below the tab bar
 * We don't animate it because it's currently broken in react-native-reanimated after the new architecture update
 * See https://github.com/software-mansion/react-native-reanimated/issues/7460
 */
export const SubTabBar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const space = useSpace()

  return <View style={[{ zIndex: 1, marginHorizontal: -space(2) }]}>{children}</View>
}

import { ScrollViewProps } from "react-native"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useColor } from "../../utils/hooks"
import { useSpace } from "../../utils/hooks/useSpace"

export const TabScrollView: React.FC<ScrollViewProps> = (props) => {
  useListenForTabContentScroll()

  const space = useSpace()
  const color = useColor()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.ScrollView
      // See: https://github.com/PedroBern/react-native-collapsible-tab-view/issues/158
      // @ts-ignore
      accessibilityComponentType={undefined}
      accessibilityTraits={undefined}
      contentContainerStyle={{
        marginHorizontal: space(2),
        backgroundColor: color("background"),
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

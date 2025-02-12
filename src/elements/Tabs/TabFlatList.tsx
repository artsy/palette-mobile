import { FlatListProps } from "react-native"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useColor } from "../../utils/hooks"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabFlatList<T>(props: FlatListProps<T>) {
  useListenForTabContentScroll()

  const space = useSpace()
  const color = useColor()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.FlatList
      contentContainerStyle={{
        marginHorizontal: space(2),
        backgroundColor: color("background"),
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

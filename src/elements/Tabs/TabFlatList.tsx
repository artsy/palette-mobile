import { FlatListProps } from "react-native"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./useListenForTabContentScroll"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabFlatList<T>(props: FlatListProps<T>) {
  useListenForTabContentScroll()

  const space = useSpace()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.FlatList
      contentContainerStyle={{
        marginHorizontal: space(2),
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

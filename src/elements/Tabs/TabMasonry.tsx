import { MasonryFlashListProps } from "@shopify/flash-list"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabMasonry<T>(props: MasonryFlashListProps<T>) {
  useListenForTabContentScroll()

  const space = useSpace()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.MasonryFlashList
      contentContainerStyle={{
        paddingHorizontal: space(2),
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

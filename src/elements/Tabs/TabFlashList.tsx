import { FlashListProps } from "@shopify/flash-list"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabFlashList<T>(props: FlashListProps<T>) {
  useListenForTabContentScroll()

  const space = useSpace()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.FlashList
      contentContainerStyle={{
        paddingHorizontal: space(2),
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

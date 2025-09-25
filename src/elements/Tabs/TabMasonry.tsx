import { FlashListProps, FlashListRef } from "@shopify/flash-list"
import { Ref } from "react"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabMasonry<T>(
  props: FlashListProps<T> & {
    innerRef?: Ref<FlashListRef<T>> | null
  }
) {
  useListenForTabContentScroll()

  const space = useSpace()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.FlashList
      masonry={true}
      contentContainerStyle={{
        paddingHorizontal: space(2),
        ...contentContainerStyle,
      }}
      {...props}
      ref={props.innerRef}
    />
  )
}

import { MasonryFlashListProps, MasonryFlashListRef } from "@shopify/flash-list"
import { RefObject } from "react"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabMasonry<T>(
  props: MasonryFlashListProps<T> & {
    innerRef: RefObject<MasonryFlashListRef<T>> | null | undefined
  }
) {
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
      ref={props.innerRef}
    />
  )
}

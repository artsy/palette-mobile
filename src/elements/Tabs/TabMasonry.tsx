import { MasonryFlashListProps, MasonryFlashListRef } from "@shopify/flash-list"
import { RefObject } from "react"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useColor } from "../../utils/hooks"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabMasonry<T>(
  props: MasonryFlashListProps<T> & {
    innerRef?: RefObject<MasonryFlashListRef<T>> | null
  }
) {
  useListenForTabContentScroll()

  const space = useSpace()
  const color = useColor()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.MasonryFlashList
      contentContainerStyle={{
        paddingHorizontal: space(2),
        backgroundColor: color("background"),
        ...contentContainerStyle,
      }}
      {...props}
      ref={props.innerRef}
    />
  )
}

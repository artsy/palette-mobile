import { FlashListProps } from "@shopify/flash-list"
import { Tabs } from "react-native-collapsible-tab-view"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"
import { useColor } from "../../utils/hooks"
import { useSpace } from "../../utils/hooks/useSpace"

export function TabFlashList<T>(props: FlashListProps<T>) {
  useListenForTabContentScroll()

  const space = useSpace()
  const color = useColor()

  const contentContainerStyle = (props.contentContainerStyle ?? {}) as object

  return (
    <Tabs.FlashList
      contentContainerStyle={{
        paddingHorizontal: space(2),
        backgroundColor: color("background"),
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

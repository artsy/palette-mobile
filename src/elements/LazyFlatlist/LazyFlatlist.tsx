import { ReactElement } from "react"
import { useHasSeenItem } from "./useHasSeenItem"

export function LazyFlatlist<T>(props: {
  keyExtractor: (item: T) => string
  children: (props: {
    viewedItems: Set<string>
    viewabilityConfig: any
    onViewableItemsChanged: any
    hasSeenItem: (item: T) => boolean
  }) => React.ReactNode | null | undefined
}): ReactElement {
  const { viewabilityConfig, onViewableItemsChanged, hasSeenItem, viewedItems } = useHasSeenItem({
    keyExtractor: props.keyExtractor,
  })

  if (!props.children || typeof props.children !== "function") {
    throw new Error("LazyScrollContext requires children")
  }

  return props.children({
    viewedItems,
    viewabilityConfig,
    onViewableItemsChanged,
    hasSeenItem,
  }) as ReactElement
}

import { useRef, useState } from "react"
import { ViewToken, ViewabilityConfig } from "react-native"

// This is a custom hook that is used to determine if a user has seen an item in a list or not
export const useHasSeenItem = <T,>({ keyExtractor }: { keyExtractor: (item: T) => string }) => {
  const [viewedItems, setViewedItems] = useState<Set<string>>(new Set())

  const viewabilityConfig = useRef<ViewabilityConfig>({
    // Percent of of the item that is visible for a partially occluded item to count as "viewable"
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 300,
    waitForInteraction: false,
  }).current

  const viewedItemsRef = useRef<Set<string>>(new Set()).current

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      viewableItems.forEach(({ item }) => {
        viewedItemsRef.add(keyExtractor(item))
      })

      setViewedItems(new Set(viewedItemsRef))
    }
  ).current

  const hasSeenItem = (item: T) => {
    return viewedItems.has(keyExtractor(item))
  }

  return {
    onViewableItemsChanged,
    viewabilityConfig,
    hasSeenItem,
    viewedItems,
  }
}

import { useRef, useState } from "react"
import { FlatListProps } from "react-native"

// Derived from FlatListProps so this works with both the legacy and the Strict TypeScript API
// (ViewToken/ViewabilityConfig are no longer exported under the strict API)
type ViewabilityConfig = NonNullable<FlatListProps<unknown>["viewabilityConfig"]>
type ViewToken = Parameters<
  NonNullable<FlatListProps<unknown>["onViewableItemsChanged"]>
>[0]["viewableItems"][number]

// This is a custom hook that is used to determine if a user has seen an item in a list or not
export const useHasSeenItem = <T,>({ keyExtractor }: { keyExtractor: (item: T) => string }) => {
  const [viewedItems, setViewedItems] = useState<Set<string>>(new Set())

  const viewabilityConfig = useRef<ViewabilityConfig>({
    // Percent of of the item that is visible for a partially occluded item to count as "viewable"
    itemVisiblePercentThreshold: 20,
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

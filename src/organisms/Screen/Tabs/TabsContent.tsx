import { useAnimatedHeaderScrolling } from "palette/organisms/Screen/hooks"
import {
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
  SectionList,
  SectionListProps,
} from "react-native"
import { Tabs, useCurrentTabScrollY } from "react-native-collapsible-tab-view"

// When testing with react-native-collapsible-tab-view and reanimated,
// we had problems making the tests run in jest.
// For that reason, when we use these components in the app,
// we use the regular `Tabs` variants, coming from collapsible-tab-view,
// and when we test, we use the react-native variants, to avoid the issues.
// That means that when testing these components, we actually test the content
// inside the tab, and not the tab navigation part.

export const TabsFlatList = <T,>(props: FlatListProps<T>) => {
  if (__TEST__) return <FlatList {...props} />

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollY = useCurrentTabScrollY()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAnimatedHeaderScrolling(scrollY, true)

  return <Tabs.FlatList {...props} />
}

export const TabsScrollView = (props: ScrollViewProps) => {
  if (__TEST__) return <ScrollView {...props} />

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollY = useCurrentTabScrollY()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAnimatedHeaderScrolling(scrollY, true)

  // @ts-expect-error
  return <Tabs.ScrollView {...props} />
}

export const TabsSectionList = <T,>(props: SectionListProps<T>) => {
  if (__TEST__) return <SectionList {...props} />

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollY = useCurrentTabScrollY()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAnimatedHeaderScrolling(scrollY, true)

  return <Tabs.SectionList {...props} />
}

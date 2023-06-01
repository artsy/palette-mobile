import {
  Tabs as BaseTabs,
  useAnimatedTabIndex,
  useCurrentTabScrollY,
  useFocusedTab,
  useHeaderMeasurements,
} from "react-native-collapsible-tab-view"
import { SubTabBar } from "./SubTabBar"
import { TabFlatList } from "./TabFlatList"
import { TabScrollView } from "./TabScrollView"
import { TabsContainer } from "./TabsContainer"
import { TabsProvider, useTabsContext } from "./TabsContext"
import { TabsWithHeader } from "./TabsWithHeader"
import { useListenForTabContentScroll } from "./useListenForTabContentScroll"

export const Tabs = Object.assign(TabsContainer, {
  FlatList: TabFlatList,
  Lazy: BaseTabs.Lazy,
  Provider: TabsProvider,
  ScrollView: TabScrollView,
  SectionList: BaseTabs.SectionList,
  SubTabBar,
  Tab: BaseTabs.Tab,
  TabsProvider,
  TabsWithHeader,

  // Hooks
  useAnimatedTabIndex,
  useCurrentTabScrollY,
  useListenForTabContentScroll,
  useTabsContext,
  useFocusedTab,
  useHeaderMeasurements,
})

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
import { TabsWithHeader } from "./TabsWithHeader"
import { useListenForTabContentScroll } from "./hooks/useListenForTabContentScroll"

export const Tabs = Object.assign(TabsContainer, {
  FlatList: TabFlatList,
  Lazy: BaseTabs.Lazy,
  ScrollView: TabScrollView,
  SectionList: BaseTabs.SectionList,
  SubTabBar,
  Tab: BaseTabs.Tab,
  TabsWithHeader,

  // Hooks
  useAnimatedTabIndex,
  useCurrentTabScrollY,
  useListenForTabContentScroll,
  useFocusedTab,
  useHeaderMeasurements,
})

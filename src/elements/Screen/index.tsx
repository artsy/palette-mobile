import { Background } from "./Background"
import { Body } from "./Body"
import { BottomView } from "./BottomView"
import { FloatingHeader } from "./FloatingHeader"
import { FullWidthDivider } from "./FullWidthDivider"
import { FullWidthItem } from "./FullWidthItem"
import { AnimatedHeader, Header } from "./Header"
import { LazyScrollContext } from "./LazyScrollContext"
import { ScreenBase } from "./ScreenBase"
import { ScreenFlatList } from "./ScreenFlatList"
import { ScreenScrollContextProvider, useScreenScrollContext } from "./ScreenScrollContext"
import { ScreenScrollView } from "./ScreenScrollView"
import { StickySubHeader } from "./StickySubHeader"
import { useListenForScreenScroll } from "./hooks/useListenForScreenScroll"

export * from "./constants"

export const Screen = Object.assign(ScreenBase, {
  AnimatedHeader,
  Background,
  Body,
  BottomView,
  FlatList: ScreenFlatList,
  FloatingHeader,
  FullWidthDivider,
  FullWidthItem,
  Header,
  ScreenScrollContextProvider,
  ScrollView: ScreenScrollView,
  StickySubHeader: StickySubHeader,

  // Hooks
  useListenForScreenScroll,
  useScreenScrollContext,
  LazyScrollContext,
})

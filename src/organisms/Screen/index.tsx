import { ScreenWrapper } from "./Screen"
import { AnimatedTitleHeader, PlaceholderAnimatedTitleHeader } from "./exposed/AnimatedTitleHeader"
import {
  AnimatedTitleTabsBody,
  PlaceholderAnimatedTitleTabsBody,
} from "./exposed/AnimatedTitleTabsBody"
import { Background } from "./exposed/Background"
import { Body } from "./exposed/Body"
import { BodyXPadding } from "./exposed/BodyXPadding"
import { BottomView, SafeBottomPadding } from "./exposed/BottomView"
import { FloatingHeader } from "./exposed/FloatingHeader"
import { FullWidthDivider } from "./exposed/FullWidthDivider"
import { FullWidthItem } from "./exposed/FullWidthItem"
import { Header } from "./exposed/Header"
import { LargeTitle } from "./exposed/LargeTitle"
import { RawHeader } from "./exposed/RawHeader"
import { TabsBody, PlaceholderTabsBody } from "./exposed/TabsBody"

export const Screen = Object.assign(ScreenWrapper, {
  Body,
  TabsBody,
  AnimatedTitleTabsBody,

  Header,
  FloatingHeader,
  RawHeader,
  AnimatedTitleHeader,

  Background,
  BottomView,
  BodyXPadding,
  SafeBottomPadding,
  LargeTitle,
  FullWidthItem,
  FullWidthDivider,

  PlaceholderTabsBody,
  PlaceholderAnimatedTitleHeader,
  PlaceholderAnimatedTitleTabsBody,
})

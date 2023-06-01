import { Background } from "./Background"
import { Body } from "./Body"
import { BottomView } from "./BottomView"
import { FloatingHeader } from "./FloatingHeader"
import { FullWidthDivider } from "./FullWidthDivider"
import { FullWidthItem } from "./FullWidthItem"
import { AnimatedTabsHeader, Header } from "./Header"
import { ScreenBase } from "./ScreenBase"

export * from "./constants"

export const Screen = Object.assign(ScreenBase, {
  AnimatedTabsHeader,
  Background,
  Body,
  BottomView,
  FloatingHeader,
  FullWidthDivider,
  FullWidthItem,
  Header,
})

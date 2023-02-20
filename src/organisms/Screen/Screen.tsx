import { getChildByType, getChildrenByTypeDeep } from "react-nanny"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { Children } from "shared/types"
import { AnimatedTitleHeader, PlaceholderAnimatedTitleHeader } from "./exposed/AnimatedTitleHeader"
import {
  AnimatedTitleTabsBody,
  PlaceholderAnimatedTitleTabsBody,
} from "./exposed/AnimatedTitleTabsBody"
import { Background } from "./exposed/Background"
import { Body } from "./exposed/Body"
import { FloatingHeader } from "./exposed/FloatingHeader"
import { Header } from "./exposed/Header"
import { RawHeader } from "./exposed/RawHeader"
import { PlaceholderTabsBody, TabsBody } from "./exposed/TabsBody"
import { Flex } from "../../elements/Flex"

export type ScreenProps = Children & {
  raw?: boolean
}

export const ScreenWrapper = ({ children, raw = false }: ScreenProps) => {
  if (raw) return <Flex flex={1}>{children}</Flex>

  return <ScreenRoot>{children}</ScreenRoot>
}

const warnIfAnimatedTitleHeaderWithoutBodySupport = (children: React.ReactNode) => {
  if (!__DEV__) return

  // trying to use animated header? remember to use the right sibling body!
  const header = getChildByType(children, [AnimatedTitleHeader, PlaceholderAnimatedTitleHeader])
  if (header === undefined) return // no animated header, all good

  // animated header used. checking body
  const body = getChildByType(children, [AnimatedTitleTabsBody, PlaceholderAnimatedTitleTabsBody])
  const bodyWithScroll = getChildByType(children, [Body])
  if (body !== undefined) return // animated body used, all good
  if (bodyWithScroll !== undefined && (bodyWithScroll as React.ReactElement).props.scroll) return // Body has `scroll`, all good

  // something is missing, print error
  console.warn(
    "AnimatedTitleHeader requires a sibling of AnimatedTitleTabsBody or a Body with `scroll` prop."
  )
}

const ScreenRoot = ({ children }: Children) => {
  // react-nanny needs a `__TYPE` for finding children in the `exposed` folder.
  // Add one like so: `MyCoolHeader.defaultProps = { __TYPE: "screen:my-cool-header" }`

  // some checks first!
  warnIfAnimatedTitleHeaderWithoutBodySupport(children)

  const headerFloating = getChildByType(children, [FloatingHeader])
  const header = getChildByType(children, [
    Header,
    RawHeader,
    AnimatedTitleHeader,
    PlaceholderAnimatedTitleHeader,
  ])
  const background = getChildByType(children, Background)
  const bodyChildren = getChildrenByTypeDeep(children, [
    Body,
    TabsBody,
    PlaceholderTabsBody,
    AnimatedTitleTabsBody,
    PlaceholderAnimatedTitleTabsBody,
  ])

  return (
    <Flex flex={1} backgroundColor="background">
      {background /* fullscreen */}

      {header}
      {bodyChildren}

      {headerFloating /* floating, so keep close to the bottom */}
      {header !== undefined && <SafeAreaCover />}
    </Flex>
  )
}

const SafeAreaCover = () => {
  const saInsets = useSafeAreaInsets()
  return (
    <Flex
      position="absolute"
      left={0}
      right={0}
      top={0}
      height={saInsets.top}
      backgroundColor="background"
    />
  )
}

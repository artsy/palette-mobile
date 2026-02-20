import { Children, cloneElement, isValidElement, useEffect, useState } from "react"
import { Platform } from "react-native"
import {
  Tabs as BaseTabs,
  CollapsibleProps,
  MaterialTabBar,
  MaterialTabItem,
  TabItemProps,
} from "react-native-collapsible-tab-view"
import { SubTabBarProvider, TabNameProvider, useSubTabBarContext } from "./SubTabBarContext"
import { DEFAULT_ACTIVE_OPACITY } from "../../constants"
import { useColor } from "../../utils/hooks/useColor"
import { useSpace } from "../../utils/hooks/useSpace"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Pill } from "../Pill"

const TAB_BAR_HEIGHT = 50

interface Indicator {
  tabName: string
  Component: React.FC<TabItemProps<string>>
}

interface PillTabItemProps extends TabItemProps<string> {
  onTabPress?: (tabName: string) => void
  focusedTab: string
}

const PillTabItem: React.FC<PillTabItemProps> = ({ focusedTab, ...props }) => {
  return (
    <Pill
      selected={props.name === focusedTab}
      onPress={() => {
        props.onTabPress?.(props.name)
      }}
      key={props.name}
      variant="link"
    >
      {props.name}
    </Pill>
  )
}

interface DefaultTabItemProps extends TabItemProps<string> {
  indicators: Indicator[]
  onPress: (name: string) => void
}

const DefaultTabItem: React.FC<DefaultTabItemProps> = (props) => {
  const Indicator = props.indicators.find((indicator) => {
    return indicator.tabName === props.name
  })

  return (
    <Box flex={1}>
      <Flex position="absolute" width="100%">
        {!!Indicator?.Component && <Indicator.Component {...props} />}
      </Flex>
      <MaterialTabItem pressOpacity={DEFAULT_ACTIVE_OPACITY} {...props} />
    </Box>
  )
}

const SubTabBarRenderer: React.FC = () => {
  const { subTabBars, activeTabName } = useSubTabBarContext()

  const activeSubTabBar = activeTabName ? subTabBars[activeTabName] : null

  if (!activeSubTabBar) {
    return null
  }

  return <Flex zIndex={1}>{activeSubTabBar}</Flex>
}

export interface TabsContainerProps extends CollapsibleProps {
  indicators?: Indicator[]
  // This prop is more immediate than onTabChange, which waits till the
  // transition takes place
  onTabPress?: (tabName: string) => void
  stickyTabBarComponent?: React.ReactNode
  tabScrollEnabled?: boolean
  variant?: "pills" | "tabs"
}

export const TabsContainer: React.FC<TabsContainerProps> = (props) => {
  return (
    <SubTabBarProvider>
      <TabsContainerInner {...props} />
    </SubTabBarProvider>
  )
}

const TabsContainerInner: React.FC<TabsContainerProps> = ({
  children,
  indicators = [],
  initialTabName,
  onTabPress,
  renderHeader,
  stickyTabBarComponent,
  tabScrollEnabled = false,
  variant = "tabs",
  ...tabContainerProps
}) => {
  const space = useSpace()
  const color = useColor()
  const [focusedTabState, setFocusedTabState] = useState(initialTabName)
  const isIOS = Platform.OS === "ios"
  const { setActiveTabName } = useSubTabBarContext()

  // Get the first tab name from children to use as default
  const firstChild = Children.toArray(children)[0] as
    | React.ReactElement<{ name?: string }>
    | undefined
  const firstTabName = firstChild?.props?.name ?? null

  // Set initial active tab name
  useEffect(() => {
    const initial = initialTabName ?? firstTabName
    if (initial) {
      setActiveTabName(initial)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseTabs.Container
      renderHeader={renderHeader}
      headerContainerStyle={{
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        backgroundColor: color("background"),
      }}
      initialTabName={initialTabName}
      containerStyle={{
        paddingTop: space(2),
      }}
      onTabChange={(tabChangeEvent) => {
        setActiveTabName(tabChangeEvent.tabName)
        tabContainerProps.onTabChange?.(tabChangeEvent)
      }}
      renderTabBar={(tabBarProps) => {
        if (variant === "pills") {
          return (
            <Flex flexDirection="row" gap={2} alignItems="center" py={1}>
              <MaterialTabBar
                {...tabBarProps}
                scrollEnabled
                TabItemComponent={(props) => (
                  <PillTabItem
                    {...props}
                    onTabPress={(tab) => {
                      onTabPress?.(tab)
                      tabBarProps.onTabPress(tab)
                      setFocusedTabState(tab)
                    }}
                    focusedTab={focusedTabState || tabBarProps.focusedTab.value}
                  />
                )}
                indicatorStyle={{
                  backgroundColor: "transparent",
                }}
                contentContainerStyle={{
                  gap: space(1),
                  paddingHorizontal: space(2),
                }}
              />
              {stickyTabBarComponent}
            </Flex>
          )
        }

        return (
          <Flex>
            <MaterialTabBar
              {...tabBarProps}
              scrollEnabled={tabScrollEnabled}
              onTabPress={(tab) => {
                tabBarProps.onTabPress(tab)
                onTabPress?.(tab)
              }}
              style={{
                height: TAB_BAR_HEIGHT,
                borderBottomWidth: 1,
                borderColor: color("mono30"),
              }}
              TabItemComponent={(props) => <DefaultTabItem {...props} indicators={indicators} />}
              contentContainerStyle={{}}
              activeColor={color("onBackground")}
              inactiveColor={color("onBackgroundMedium")}
              labelStyle={{ marginHorizontal: 0 }} // removing the horizontal margin from the lib
              indicatorStyle={{
                backgroundColor: color("onBackground"),
                height: 1,
                // on android this line breaks the active indicator and it is not visible
                ...(isIOS && { bottom: -1 }),
              }}
              tabStyle={{
                // resets the default padding 10 from the lib
                // to prevent linebreaks on the tab titles
                paddingHorizontal: 0,
              }}
            />
            <SubTabBarRenderer />
          </Flex>
        )
      }}
      {...tabContainerProps}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child
        const tabName = (child.props as { name?: string }).name
        if (!tabName) return child
        // Clone the Tab element and wrap its children with TabNameProvider
        return cloneElement(child, {
          ...child.props,
          children: <TabNameProvider value={tabName}>{child.props.children}</TabNameProvider>,
        })
      })}
    </BaseTabs.Container>
  )
}

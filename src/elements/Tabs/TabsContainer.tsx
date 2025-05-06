import { debounce } from "lodash"
import { useState } from "react"
import { Platform } from "react-native"
import {
  Tabs as BaseTabs,
  MaterialTabBar,
  CollapsibleProps,
  MaterialTabItem,
  TabItemProps,
} from "react-native-collapsible-tab-view"
import { runOnJS, useAnimatedReaction } from "react-native-reanimated"
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
  focusedTab: { value: string }
}

const PillTabItem: React.FC<PillTabItemProps> = ({ focusedTab: focusedTabProp, ...props }) => {
  const [focusedTab, setFocusedTab] = useState(focusedTabProp.value)

  // We want to debounce the focusedTab value to avoid showing two pills at once
  const debouncedFocusedTab = debounce(setFocusedTab, 50)

  useAnimatedReaction(
    () => focusedTabProp.value,
    (value) => {
      runOnJS(debouncedFocusedTab)(value)
    }
  )

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

export interface TabsContainerProps extends CollapsibleProps {
  indicators?: Indicator[]
  // This prop is more immediate than onTabChange, which waits till the
  // transition takes place
  onTabPress?: (tabName: string) => void
  stickyTabBarComponent?: React.ReactNode
  tabScrollEnabled?: boolean
  variant?: "pills" | "tabs"
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
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

  const isIOS = Platform.OS === "ios"

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
                    }}
                    focusedTab={tabBarProps.focusedTab}
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
          <>
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
          </>
        )
      }}
      {...tabContainerProps}
    >
      {children}
    </BaseTabs.Container>
  )
}

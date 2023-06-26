import { Platform } from "react-native"
import {
  Tabs as BaseTabs,
  MaterialTabBar,
  CollapsibleProps,
  MaterialTabItem,
  TabItemProps,
} from "react-native-collapsible-tab-view"
import { useColor } from "../../utils/hooks/useColor"
import { useSpace } from "../../utils/hooks/useSpace"
import { Box } from "../Box"
import { Flex } from "../Flex"

const TAB_BAR_HEIGHT = 50

interface Indicator {
  tabName: string
  Component: React.FC<TabItemProps<string>>
}

export interface TabsContainerProps extends CollapsibleProps {
  indicators?: Indicator[]
  // This prop is more immediate than onTabChange, which waits till the
  // transition takes place
  onTabPress?: (tabName: string) => void
  tabScrollEnabled?: boolean
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  children,
  indicators = [],
  initialTabName,
  renderHeader,
  tabScrollEnabled = false,
  onTabPress,
  ...tabContainerProps
}) => {
  const space = useSpace()
  const color = useColor()

  const isIOS = Platform.OS === "ios"

  return (
    <BaseTabs.Container
      {...tabContainerProps}
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
                borderColor: color("black30"),
              }}
              TabItemComponent={(props) => {
                const Indicator = indicators.find((indicator) => {
                  return indicator.tabName === props.name
                })

                return (
                  <Box flex={1}>
                    <Flex position="absolute" width="100%">
                      {!!Indicator?.Component && <Indicator.Component {...props} />}
                    </Flex>
                    <MaterialTabItem {...props} />
                  </Box>
                )
              }}
              contentContainerStyle={{}}
              activeColor={color("onBackground")}
              inactiveColor={color("onBackgroundMedium")}
              labelStyle={{ marginTop: 0 }} // removing the horizonal margin from the lib
              indicatorStyle={{
                backgroundColor: color("onBackground"),
                height: 1,
                // on android this line breaks the active indicator and it is not visible
                ...(isIOS && { bottom: -1 }),
              }}
            />
          </>
        )
      }}
    >
      {children}
    </BaseTabs.Container>
  )
}

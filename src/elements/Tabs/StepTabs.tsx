import { useState } from "react"
import { TouchableOpacity, LayoutRectangle } from "react-native"
import { TabBarContainer } from "./TabBarContainer"
import { CheckIcon, ChevronIcon } from "../../svgs"
import { useScreenDimensions } from "../../utils/hooks/useScreenDimensions"
import { Box } from "../Box"
import { Tab, TabsProps } from "../Tabs"

/**
 * Renders a list of tabs. Evenly-spaces them across the screen with
 * each tab label and chevron evenly spaced
 */
export const StepTabs: React.FC<TabsProps> = ({ onTabPress, activeTab, tabs }) => {
  const [tabLayouts, setTabLayouts] = useState<Array<LayoutRectangle | null>>(tabs.map(() => null))
  const tabWidth = useScreenDimensions().width / tabs.length
  const onTabSelect = (label: string, index: number) => {
    if (index > 0 && !tabs[index - 1].completed) {
      return
    }
    onTabPress(label, index)
  }
  return (
    <TabBarContainer scrollEnabled={false} activeTabIndex={activeTab} tabLayouts={tabLayouts}>
      {tabs.map(({ label, completed }, index) => {
        return (
          <TouchableOpacity onPress={() => onTabSelect(label, index)} key={label + index}>
            <Box
              width={tabWidth}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              onLayout={(e) => {
                const layout = e.nativeEvent.layout
                setTabLayouts((layouts) => {
                  const result = layouts.slice(0)
                  result[index] = layout
                  return result
                })
              }}
            >
              <Box flexDirection="row" alignItems="center">
                <Tab
                  label={label}
                  onPress={() => onTabSelect(label, index)}
                  active={activeTab === index}
                  style={{ paddingHorizontal: 0, paddingLeft: 8, paddingRight: 5 }}
                  onLayout={() => {
                    // noop
                  }}
                />
                {!!completed && <CheckIcon fill="green100" height={15} width={15} />}
              </Box>
              <ChevronIcon fill="black60" height={10} width={10} />
            </Box>
          </TouchableOpacity>
        )
      })}
    </TabBarContainer>
  )
}

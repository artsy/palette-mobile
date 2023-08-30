import { CollapsibleProps } from "react-native-collapsible-tab-view"
import { TabsContainer, TabsContainerProps } from "./TabsContainer"
import { Flex } from "../Flex"
import { Screen } from "../Screen"
import { HeaderProps } from "../Screen/Header"
import { Text } from "../Text"

export interface TabsWithHeaderProps extends TabsContainerProps {
  title: string
  BelowTitleHeaderComponent?: () => JSX.Element
  headerProps?: HeaderProps
  showLargeHeaderText?: boolean
  children: CollapsibleProps["children"]
}

export const TabsWithHeader: React.FC<TabsWithHeaderProps> = ({
  children,
  BelowTitleHeaderComponent,
  headerProps = {},
  showLargeHeaderText = true,
  title,
  ...rest
}) => {
  const showTitle = showLargeHeaderText && !!title

  return (
    <Screen>
      <Screen.AnimatedHeader title={title} {...headerProps} />

      <Screen.Body fullwidth>
        <TabsContainer
          {...rest}
          renderHeader={() => {
            return (
              <>
                {!!showTitle && (
                  <Flex my={1} pl={2} justifyContent="center" pointerEvents="none">
                    <Text variant="lg-display" numberOfLines={2}>
                      {title}
                    </Text>
                  </Flex>
                )}
                {!!BelowTitleHeaderComponent && <BelowTitleHeaderComponent />}
              </>
            )
          }}
        >
          {children}
        </TabsContainer>
      </Screen.Body>
    </Screen>
  )
}

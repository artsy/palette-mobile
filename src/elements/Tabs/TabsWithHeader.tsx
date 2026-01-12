import { JSX } from "react"
import { CollapsibleProps } from "react-native-collapsible-tab-view"
import { TabsContainer, TabsContainerProps } from "./TabsContainer"
import { Flex } from "../Flex"
import { Screen } from "../Screen"
import { HeaderProps } from "../Screen/Header"
import { Text } from "../Text"

export interface TabsWithHeaderProps extends TabsContainerProps {
  BelowTitleHeaderComponent?: () => JSX.Element
  children: CollapsibleProps["children"]
  headerProps?: HeaderProps
  hideScreen?: boolean
  disableKeyboardAvoidance?: boolean
  showLargeHeaderText?: boolean
  title: string | JSX.Element
}

export const TabsWithHeader: React.FC<TabsWithHeaderProps> = ({
  headerProps = {},
  hideScreen = false,
  disableKeyboardAvoidance = false,
  title,
  ...rest
}) => {
  if (hideScreen) {
    return <Content title={title} {...rest} />
  }

  return (
    <Screen>
      <Screen.AnimatedHeader title={title} {...headerProps} />

      <Screen.Body fullwidth disableKeyboardAvoidance={disableKeyboardAvoidance}>
        <Content title={title} {...rest} />
      </Screen.Body>
    </Screen>
  )
}

const Content: React.FC<Omit<TabsWithHeaderProps, "hideScreen" | "headerProps">> = ({
  BelowTitleHeaderComponent,
  children,
  showLargeHeaderText = true,
  title,
  ...rest
}) => {
  const showTitle = showLargeHeaderText && !!title

  return (
    <TabsContainer
      {...rest}
      renderHeader={() => {
        return (
          <>
            {!!showTitle && (
              <Flex my={1} px={2} justifyContent="center" pointerEvents="none">
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
  )
}

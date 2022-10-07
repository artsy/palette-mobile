import { FlatList, StyleProp, ViewStyle } from "react-native"
import { Flex, Spacer } from "./atoms"

export const DataList = <ItemT,>({
  data,
  keyExtractor,
  renderItem,
  contentContainerStyle,
}: {
  data: ItemT[]
  keyExtractor?: (item: ItemT, index: number) => string
  renderItem: (info: { item: ItemT; index: number }) => React.ReactElement | null
  contentContainerStyle?: StyleProp<ViewStyle>
}) => (
  <FlatList
    data={data}
    keyExtractor={keyExtractor ?? ((item) => `${item}`)}
    renderItem={renderItem}
    ItemSeparatorComponent={() => <Spacer y="4" />}
    contentContainerStyle={[
      {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
      },
      contentContainerStyle,
    ]}
  />
)

export const List = ({
  children,
  contentContainerStyle,
  style,
  horizontal,
}: {
  children: React.ReactElement[] | React.ReactElement
  contentContainerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  horizontal?: boolean
}) => (
  <FlatList
    horizontal={horizontal}
    data={Array.isArray(children) ? children : [children]}
    keyExtractor={(_, index) => `${index}`}
    renderItem={({ item: child }) => child}
    ItemSeparatorComponent={() => <Spacer x="2" y="2" />}
    contentContainerStyle={[
      {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
      },
      contentContainerStyle,
    ]}
    style={style}
  />
)

export const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex width="100%" flexDirection="row" justifyContent="space-evenly">
    {children}
  </Flex>
)

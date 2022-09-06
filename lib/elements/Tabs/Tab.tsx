import { Pressable, ViewProps, View, ViewStyle } from "react-native"
import { useColor } from "../../hooks"
import { Text } from "../Text"

export interface TabV3Props {
  label: string
  superscript?: string
  active: boolean
  style?: ViewStyle
  onPress: () => void
  onLayout: ViewProps["onLayout"]
}

export const TabV3: React.FC<TabV3Props> = ({
  label,
  superscript,
  active,
  onLayout,
  onPress,
  style,
}) => {
  const color = useColor()
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          onLayout={onLayout}
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            paddingVertical: 10,
            flexDirection: "row",
            ...style,
          }}
        >
          <Text
            fontSize={16}
            color={active ? color("black100") : pressed ? color("blue100") : color("black60")}
            style={{
              textDecorationLine: pressed ? "underline" : "none",
            }}
          >
            {label}
          </Text>
          {!!superscript && (
            <Text
              fontSize={12}
              color={color("blue100")}
              style={{
                textDecorationLine: pressed ? "underline" : "none",
                top: -3,
              }}
            >
              {superscript}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  )
}

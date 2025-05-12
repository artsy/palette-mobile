import { Pressable, ViewProps, View, ViewStyle } from "react-native"
import { useColor } from "../../utils/hooks"
import { Text } from "../Text"

export interface TabV3Props {
  label: string
  superscript?: string
  active: boolean
  style?: ViewStyle
  onPress: () => void
  onLayout: ViewProps["onLayout"]
}

export const TabV3 = ({ label, superscript, active, onLayout, onPress, style }: TabV3Props) => {
  const color = useColor()
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
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
            color={active ? color("mono100") : pressed ? color("blue100") : color("mono60")}
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

import { Text, TextProps } from "../Text"
import { Touchable } from "../Touchable"

export const LinkButton = (props: TextProps) => (
  <Touchable accessibilityRole="link" onPress={props.onPress}>
    <Text underline {...props} />
  </Touchable>
)

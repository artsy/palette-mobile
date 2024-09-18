import { TextProps, Text } from "../Text"
import { Touchable } from "../Touchable"

export const LinkButton = (props: TextProps) => (
  <Touchable onPress={props.onPress}>
    <Text underline {...props} />
  </Touchable>
)

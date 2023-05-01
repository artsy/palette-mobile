import { Touchable } from ".."
import { TextProps, Text } from "../Text"

export const LinkButton = (props: TextProps) => (
  <Touchable onPress={props.onPress}>
    <Text underline {...props} />
  </Touchable>
)

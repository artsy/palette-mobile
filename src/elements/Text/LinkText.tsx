import { Text, TextProps } from "./Text"

export const LinkText = ({ style, ...props }: TextProps) => (
  <Text color="black100" {...props} style={[style, { textDecorationLine: "underline" }]} />
)

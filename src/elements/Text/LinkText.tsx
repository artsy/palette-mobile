import { Text, TextProps } from "./Text"

export const LinkText = ({ style, ...props }: TextProps) => (
  <Text color="mono100" {...props} style={[style, { textDecorationLine: "underline" }]} />
)

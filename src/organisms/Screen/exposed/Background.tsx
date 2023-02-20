import { Flex } from "../../../elements/Flex"

export const Background = ({ children }: { children: React.ReactNode }) => (
  <Flex position="absolute" top={0} bottom={0} left={0} right={0}>
    {children}
  </Flex>
)
Background.defaultProps = { __TYPE: "screen:background" }

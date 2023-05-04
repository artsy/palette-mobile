import { Flex } from "../Flex"

export const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Flex position="absolute" top={0} bottom={0} left={0} right={0}>
    {children}
  </Flex>
)

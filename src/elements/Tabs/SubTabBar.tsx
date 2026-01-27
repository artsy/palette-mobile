import { Flex } from "../Flex"

/**
 * Use to position content directly below the tab bar, and for it to stick while
 * scrolling in the subview.
 *
 * Useful for views where subcontent has a s
 */
export const SubTabBar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Flex zIndex={1} mx={-2}>
      {children}
    </Flex>
  )
}

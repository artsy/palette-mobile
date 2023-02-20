import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Flex } from "../../../elements/Flex"
import { Wrap } from "../../../utils/Wrap"
import { useSetHandledTopSafeArea } from "../atoms"

const Z = {
  header: 10,
}

interface RawHeaderProps {
  children: React.ReactNode
  nosafe?: boolean
}

/**
 * Use `RawHeader` when you need to make a custom header that we have no support for yet.
 */
export const RawHeader = ({ children, nosafe = false }: RawHeaderProps) => {
  useSetHandledTopSafeArea(!nosafe)
  const saInsets = useSafeAreaInsets()

  return (
    <Wrap if={!nosafe}>
      <Flex top={saInsets.top} backgroundColor="background" zIndex={Z.header}>
        <Wrap.Content>{children}</Wrap.Content>
      </Flex>
    </Wrap>
  )
}
RawHeader.defaultProps = { __TYPE: "screen:raw-header" }

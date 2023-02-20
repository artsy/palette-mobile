import { SCREEN_HORIZONTAL_PADDING } from "./Body"
import { Flex, FlexProps } from "../../../elements/Flex"

/**
 * Only use with `<Screen.Body fullwidth>`.
 * It's basically an easy way to get the right padding when you also need the fullwidth body.
 * One use case might be if you need to put an image background or something in the body,
 * but you also need some content with the right padding.
 */
export const BodyXPadding = (props: FlexProps) => <Flex px={SCREEN_HORIZONTAL_PADDING} {...props} />
BodyXPadding.defaultProps = { __TYPE: "screen:body-x-padding" }

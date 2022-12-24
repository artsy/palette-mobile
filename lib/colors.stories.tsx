import { List, Row } from "./storybookHelpers"
import { Box, Flex } from "./atoms"
import { useColor } from "./hooks"
import { Color } from "@artsy/palette-tokens"
import { Text } from "./elements/Text"

export default {
  title: "Tokens/colors",
}

const ColorSquare = ({ color: theColor, bright }: { color: Color; bright?: boolean }) => {
  const color = useColor()
  return (
    <Flex>
      <Flex
        style={[
          {
            backgroundColor: color(theColor),
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
          },
          bright && {
            borderWidth: 0.5,
            borderColor: "grey",
          },
        ]}
      />
      <Text>{theColor}</Text>
      <Text color="onBackgroundLow">{color(theColor)}</Text>
    </Flex>
  )
}

export const Styled = () => (
  <List>
    <Row>
      <ColorSquare color="black100" />
      <ColorSquare color="black60" />
      <ColorSquare color="black30" />
    </Row>
    <Row>
      <ColorSquare color="black10" />
      <ColorSquare color="black5" />
      <ColorSquare color="white100" bright />
    </Row>
    <Row>
      <ColorSquare color="brand" />
      <ColorSquare color="blue100" />
      <ColorSquare color="blue10" />
    </Row>
    <Row>
      <ColorSquare color="green100" />
      <ColorSquare color="green10" />
    </Row>
    <Row>
      <ColorSquare color="red100" />
      <ColorSquare color="red10" />
    </Row>
    <Row>
      <ColorSquare color="yellow100" />
      <ColorSquare color="yellow10" />
    </Row>
    <Row>
      <ColorSquare color="devpurple" />
    </Row>
  </List>
)

//     return {
//       ...this.v3,
//       colors: {
//         ...this.v3.colors,
//         background: this.v3.colors.white100,
//         onBackground: this.v3.colors.black100,
//         onBackgroundHigh: this.v3.colors.black100,
//         onBackgroundMedium: this.v3.colors.black60,
//         onBackgroundLow: this.v3.colors.black30,
//         //add surface, onSurface
//         primary: this.v3.colors.black100,
//         onPrimaryHigh: this.v3.colors.white100,
//         onPrimaryMedium: this.v3.colors.black10,
//         onPrimaryLow: this.v3.colors.black10,
//         secondary: this.v3.colors.black30,
//         onSecondaryHigh: this.v3.colors.black100,
//         onSecondaryMedium: this.v3.colors.black60,
//         onSecondaryLow: this.v3.colors.black60,
//         brand: this.v3.colors.blue100,
//         onBrand: this.v3.colors.white100,
//       },
//     }
//   },
//   /** @deprecated Use `v5light` */
//   get v5() {
//     return this.v5light
//   },
//   get v5dark() {
//     return {
//       ...this.v3,
//       colors: {
//         ...this.v3.colors,
//         background: this.v3.colors.black100,
//         onBackground: this.v3.colors.white100,
//         onBackgroundHigh: this.v3.colors.white100,
//         onBackgroundMedium: this.v3.colors.black30,
//         onBackgroundLow: this.v3.colors.black60,
//         primary: this.v3.colors.white100,
//         onPrimaryHigh: this.v3.colors.black100,
//         onPrimaryMedium: this.v3.colors.black60,
//         onPrimaryLow: this.v3.colors.black60,
//         secondary: this.v3.colors.black60,
//         onSecondaryHigh: this.v3.colors.white100,
//         onSecondaryMedium: this.v3.colors.black10,
//         onSecondaryLow: this.v3.colors.black10,
//         brand: this.v3.colors.blue100,
//         onBrand: this.v3.colors.white100,
//       },
//     }
//   },
// }

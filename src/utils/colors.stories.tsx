import { Flex } from "../elements/Flex"
import { Text } from "../elements/Text"
import { List, Row } from "../storybook/helpers"
import { COLOR_LAYER_NAME } from "../tokens"
import { ColorCSS, ColorDSValue, ColorLayerName, ColorLayerRole, isRoleLayer } from "../types"
import { useColor } from "../utils/hooks"

export default {
  title: "Tokens/colors",
}

const ColorSquare = ({ color: theColor, border }: { color: ColorDSValue; border?: boolean }) => {
  const color = useColor()

  const contrast =
    theColor.startsWith("on") &&
    (theColor.endsWith("High") || theColor.endsWith("Medium") || theColor.endsWith("Low"))
      ? theColor.match(/(High|Medium|Low)$/)?.[0]
      : undefined

  const colorWithoutContrast = theColor.replace(/(High|Medium|Low)$/, "")

  const cssName = useCssColorName(theColor)
  const namedName = useNamedColorName(theColor as any)
  const displayName = isRoleLayer(theColor) ? namedName : cssName

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
          border && {
            borderWidth: 0.5,
            borderColor: "grey",
          },
        ]}
      />
      <Text>{colorWithoutContrast}</Text>
      {contrast && <Text>{contrast}</Text>}
      <Text color="onBackgroundLow">{displayName}</Text>
    </Flex>
  )
}

export const All = () => (
  <List>
    <Row>
      <ColorSquare color="mono100" border />
      <ColorSquare color="mono60" />
      <ColorSquare color="mono30" />
    </Row>
    <Row>
      <ColorSquare color="mono15" />
      <ColorSquare color="mono10" />
      <ColorSquare color="mono5" />
      <ColorSquare color="mono0" border />
    </Row>
    <Row>
      <ColorSquare color="blue150" />
      <ColorSquare color="blue100" />
      <ColorSquare color="blue10" />
    </Row>
    <Row>
      <ColorSquare color="green150" />
      <ColorSquare color="green100" />
      <ColorSquare color="green10" />
    </Row>
    <Row>
      <ColorSquare color="yellow150" />
      <ColorSquare color="yellow100" />
      <ColorSquare color="yellow10" />
    </Row>
    <Row>
      <ColorSquare color="orange150" />
      <ColorSquare color="orange100" />
      <ColorSquare color="orange10" />
    </Row>
    <Row>
      <ColorSquare color="red150" />
      <ColorSquare color="red100" />
      <ColorSquare color="red10" />
    </Row>
    <Row>
      <ColorSquare color="brand" />
      <ColorSquare color="devpurple" />
    </Row>
    <Row>
      <ColorSquare color="background" border />
    </Row>
    <Row>
      <ColorSquare color="onBackgroundHigh" border />
      <ColorSquare color="onBackgroundMedium" />
      <ColorSquare color="onBackgroundLow" />
    </Row>
    <Row>
      <ColorSquare color="surface" border />
    </Row>
    <Row>
      <ColorSquare color="onSurfaceHigh" border />
      <ColorSquare color="onSurfaceMedium" />
      <ColorSquare color="onSurfaceLow" />
    </Row>
    <Row>
      <ColorSquare color="primary" border />
    </Row>
    <Row>
      <ColorSquare color="onPrimaryHigh" border />
      <ColorSquare color="onPrimaryMedium" />
      <ColorSquare color="onPrimaryLow" />
    </Row>
    <Row>
      <ColorSquare color="secondary" />
    </Row>
    <Row>
      <ColorSquare color="onSecondaryHigh" />
      <ColorSquare color="onSecondaryMedium" />
      <ColorSquare color="onSecondaryLow" />
    </Row>
    <Row>
      <ColorSquare color="brand" />
    </Row>
    <Row>
      <ColorSquare color="onBrand" border />
    </Row>
  </List>
)

const useNamedColorName = (theColor: ColorLayerRole): ColorLayerName => {
  const color = useColor()
  const cssName = useCssColorName(theColor)

  const namedColor = Object.keys(COLOR_LAYER_NAME).find(
    (name) => color(name) === color(theColor)
  ) as ColorLayerName

  if (namedColor === undefined) return cssName as ColorLayerName
  return namedColor
}

const useCssColorName = (theColor: ColorDSValue): ColorCSS => {
  const color = useColor()
  return color(theColor)
}

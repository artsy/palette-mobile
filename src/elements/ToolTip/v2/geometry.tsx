import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { cloneDeep } from "lodash"
import { EdgeInsets } from "react-native-safe-area-context"
import { Padding, PointerPlacementType, ToolTipPlacementType } from "./ToolTip"

export interface Size {
  width: number
  height: number
}
export interface Point {
  x: number
  y: number
}
export type Rectangle = Point & Size
export type Layout = Rectangle & { pageX: number; pageY: number }

export interface GeometryInputs {
  toolTipPlacement: ToolTipPlacementType
}

export interface GeometryOutputs {
  pointerProps: { pointerPlacement: PointerPlacementType; mx?: number }
  toolTipOrigin: Point
  toolTipPlacement: ToolTipPlacementType
}

// do we have a const file to pull from for these translations?
const paddingToPx = (
  padding?: Padding
): { top: number; bottom: number; left: number; right: number } => {
  const translate = (value: SpacingUnit | 0 | undefined) => {
    switch (value) {
      case 0.5:
        return 5
      case 1:
        return 10
      case 2:
        return 20
      case 4:
        return 40
      case 6:
        return 60
      case 12:
        return 120
      case 0:
      default:
        return 0
    }
  }

  return {
    top: translate(padding?.top),
    bottom: translate(padding?.bottom),
    left: translate(padding?.left),
    right: translate(padding?.right),
  }
}

const POINTER_SIZE: Size = { height: 12, width: 10 }
const GUTTER = 5

interface OriginGeometryInputs {
  anchor: Layout
  contentSize: Size
  padding?: Padding
  unconstrained?: boolean
}

const computeToolTipTopPlacementOriginPoint = (inputs: OriginGeometryInputs): Point => {
  const { anchor, contentSize, padding, unconstrained } = inputs
  const { bottom } = paddingToPx(padding)
  return {
    x: anchor.x + anchor.width / 2 - contentSize.width / 2,
    y: unconstrained
      ? anchor.y - anchor.height / 2
      : anchor.y - contentSize.height - bottom - POINTER_SIZE.height,
  }
}
const computeToolTipBottomPlacementOriginPoint = (inputs: OriginGeometryInputs) => {
  const { anchor, contentSize, unconstrained } = inputs
  return {
    x: anchor.x + anchor.width / 2 - contentSize.width / 2,
    y: unconstrained
      ? anchor.pageY + contentSize.height
      : anchor.y + anchor.height + POINTER_SIZE.height,
  }
}
export const computeToolTipOriginPoint = (inputs: GeometryInputs & OriginGeometryInputs) => {
  const { toolTipPlacement, ...rest } = inputs
  switch (toolTipPlacement) {
    case "top":
      return computeToolTipTopPlacementOriginPoint(rest)
    case "bottom":
    default:
      return computeToolTipBottomPlacementOriginPoint(rest)
  }
}

interface XAxisGeometryInputs {
  anchor: Layout
  contentSize: Size
  padding?: Padding
  toolTipPlacement: ToolTipPlacementType
  toolTipOrigin: Point
  windowDimensions: Size
}
// Immaterial whether left or right overflow for now
// as we are only supporting bottom and top placements
const evaluateForXAxisOverflow = (
  inputs: XAxisGeometryInputs & GeometryInputs
): GeometryOutputs => {
  const { anchor, contentSize, padding, toolTipPlacement, toolTipOrigin, windowDimensions } = inputs
  const { left, right } = paddingToPx(padding)
  const pointerPlacement = toolTipPlacement === "bottom" ? "top" : "bottom"
  // create a clone so that none of the passed values are mutated
  const output: GeometryOutputs = cloneDeep({
    pointerProps: { pointerPlacement },
    toolTipOrigin,
    toolTipPlacement,
  })

  // if tooltip origin is beyond left bounds
  if (toolTipOrigin.x < 0) {
    output.toolTipOrigin.x = GUTTER
    output.pointerProps = {
      pointerPlacement: `${pointerPlacement}-left` as PointerPlacementType,
      mx: anchor.width / 2 - left,
    }
  }

  // if tooltip origin is beyond right bounds
  if (toolTipOrigin.x > windowDimensions.width - contentSize.width) {
    output.toolTipOrigin.x = windowDimensions.width - contentSize.width - GUTTER
    output.pointerProps = {
      pointerPlacement: `${pointerPlacement}-right` as PointerPlacementType,
      mx: anchor.width / 2 - right,
    }
  }

  return output
}

interface YAxisGeometryInputs {
  anchor: Layout
  contentSize: Size
  safeAreaInsets: EdgeInsets
  toolTipOrigin: Point
  unconstrained?: boolean
  windowDimensions: Size
}

// if tooltip origin is beyond top bounds
const evaluateForTopBoundsOverflow = (
  inputs: Omit<YAxisGeometryInputs, "windowDimensions">
): ToolTipPlacementType => {
  const { anchor, contentSize, safeAreaInsets, toolTipOrigin, unconstrained } = inputs
  if (!unconstrained && toolTipOrigin.y - safeAreaInsets.top < 0) {
    return "bottom"
  } else if (!!unconstrained && anchor.y - contentSize.height - safeAreaInsets.top < 0) {
    return "bottom"
  }
  return "top"
}

// if tooltip origin is beyond bottom bounds
const evaluateForBottomBoundsOverflow = (inputs: YAxisGeometryInputs): ToolTipPlacementType => {
  const { anchor, contentSize, safeAreaInsets, toolTipOrigin, unconstrained, windowDimensions } =
    inputs
  if (!!unconstrained && toolTipOrigin.y + safeAreaInsets.bottom > windowDimensions.height) {
    return "top"
  } else if (
    !unconstrained &&
    anchor.y + contentSize.height + POINTER_SIZE.height + safeAreaInsets.bottom >
      windowDimensions.height
  ) {
    return "top"
  }
  return "bottom"
}

const evaluateForYAxisOverflow = (inputs: YAxisGeometryInputs & GeometryInputs) => {
  const { toolTipPlacement, ...rest } = inputs
  switch (toolTipPlacement) {
    case "top":
      return evaluateForTopBoundsOverflow(rest)
    case "bottom":
    default:
      return evaluateForBottomBoundsOverflow(rest)
  }
}

export const evaluateForXYAxisOverflow = (
  inputs: GeometryInputs & OriginGeometryInputs & XAxisGeometryInputs & YAxisGeometryInputs
): GeometryOutputs => {
  const xEval: GeometryOutputs = evaluateForXAxisOverflow(inputs)
  const yEval: ToolTipPlacementType = evaluateForYAxisOverflow(inputs)
  const outputs = { ...xEval, tooltipPlacement: yEval }
  return outputs
}

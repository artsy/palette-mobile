import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
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
  anchor: Layout
  contentSize: Size
  padding?: Padding
  safeAreaInsets?: EdgeInsets
  toolTipOrigin: Point
  unconstrained?: boolean
  windowDimensions: Size
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

const computeToolTipTopPlacementOriginPoint = (
  anchor: Layout,
  contentSize: Size,
  padding: Padding | undefined,
  unconstrained?: boolean
): Point => {
  console.log("computeToolTipTopPlacementOriginPoint")
  const { bottom } = paddingToPx(padding)
  return {
    x: anchor.x + anchor.width / 2 - contentSize.width / 2,
    y: unconstrained
      ? anchor.y - anchor.height / 2
      : anchor.y - contentSize.height - bottom - POINTER_SIZE.height,
  }
}
const computeToolTipBottomPlacementOriginPoint = (
  anchor: Layout,
  contentSize: Size,
  unconstrained?: boolean
) => {
  console.log("computeToolTipBottomPlacementOriginPoint")
  return {
    x: anchor.x + anchor.width / 2 - contentSize.width / 2,
    y: unconstrained
      ? anchor.y + contentSize.height
      : anchor.y + anchor.height + POINTER_SIZE.height,
  }
}
export const computeToolTipOriginPoint = (
  anchor: Layout,
  contentSize: Size,
  padding: Padding | undefined,
  placement: ToolTipPlacementType,
  unconstrained?: boolean
) => {
  switch (placement) {
    case "top":
      return computeToolTipTopPlacementOriginPoint(anchor, contentSize, padding, unconstrained)
    case "bottom":
    default:
      return computeToolTipBottomPlacementOriginPoint(anchor, contentSize, unconstrained)
  }
}

// Immaterial whether left or right overflow for now
// as we are only supporting bottom and top placements
const evaluateForXAxisOverflow = (
  anchorWidth: number,
  contentWidth: number,
  padding: Padding | undefined,
  toolTipPlacement: ToolTipPlacementType,
  toolTipOrigin: Point,
  windowWidth: number
): GeometryOutputs => {
  const { left, right } = paddingToPx(padding)
  const pointerPlacement = toolTipPlacement === "bottom" ? "top" : "bottom"
  const output: GeometryOutputs = {
    pointerProps: { pointerPlacement },
    toolTipOrigin,
    toolTipPlacement,
  }

  // if tooltip origin is beyond left bounds
  if (toolTipOrigin.x < 0) {
    output.toolTipOrigin.x = 5
    output.pointerProps = {
      pointerPlacement: `${pointerPlacement}-left` as PointerPlacementType,
      mx: anchorWidth / 2 - left,
    }
  }

  // if tooltip origin is beyond right bounds
  if (toolTipOrigin.x > windowWidth - contentWidth) {
    output.toolTipOrigin.x = windowWidth - contentWidth - GUTTER
    output.pointerProps = {
      pointerPlacement: `${pointerPlacement}-left` as PointerPlacementType,
      mx: anchorWidth / 2 - right,
    }
  }

  return output
}

const evaluateForTopBoundsOverflow = (
  anchorY: number,
  contentHeight: number,
  safeAreaHeader: number,
  toolTipOriginY: number,
  unconstrained?: boolean
): ToolTipPlacementType => {
  console.log("evaluateForTopBoundsOverflow")
  // if tooltip origin is beyond top bounds
  if (!unconstrained && toolTipOriginY - safeAreaHeader < 0) {
    return "bottom"
  } else if (!!unconstrained && anchorY - contentHeight - safeAreaHeader < 0) {
    return "bottom"
  }
  return "top"
}
const evaluateForBottomBoundsOverflow = (
  anchorY: number,
  contentHeight: number,
  safeAreaFooter: number,
  toolTipOriginY: number,
  windowHeight: number,
  unconstrained?: boolean
): ToolTipPlacementType => {
  console.log("evaluateForBottomBoundsOverflow")
  // if tooltip origin is beyond bottom bounds
  if (!!unconstrained && toolTipOriginY + safeAreaFooter > windowHeight) {
    return "top"
  } else if (
    !unconstrained &&
    anchorY + contentHeight + POINTER_SIZE.height + safeAreaFooter > windowHeight
  ) {
    return "top"
  }
  return "bottom"
}
const evaluateForYAxisOverflow = (
  anchorY: number,
  contentHeight: number,
  placement: ToolTipPlacementType,
  safeAreaFooter: number,
  toolTipOriginY: number,
  windowHeight: number,
  unconstrained?: boolean
) => {
  switch (placement) {
    case "top":
      return evaluateForTopBoundsOverflow(
        anchorY,
        contentHeight,
        safeAreaFooter,
        toolTipOriginY,
        unconstrained
      )
    case "bottom":
    default:
      return evaluateForBottomBoundsOverflow(
        anchorY,
        contentHeight,
        safeAreaFooter,
        toolTipOriginY,
        windowHeight,
        unconstrained
      )
  }
}

export const evaluateForXYAxisOverflow = (
  anchor: Layout,
  contentSize: Size,
  padding: Padding | undefined,
  placement: ToolTipPlacementType,
  safeAreaInsets: EdgeInsets,
  toolTipOrigin: Point,
  windowDimensions: Size,
  unconstrained?: boolean
): GeometryOutputs => {
  const xEval: GeometryOutputs = evaluateForXAxisOverflow(
    anchor.width,
    contentSize.width,
    padding,
    placement,
    toolTipOrigin,
    windowDimensions.width
  )

  const yEval: ToolTipPlacementType = evaluateForYAxisOverflow(
    anchor.y,
    contentSize.height,
    placement,
    safeAreaInsets.bottom,
    toolTipOrigin.y,
    windowDimensions.height,
    unconstrained
  )
  const outputs = { ...xEval, tooltipPlacement: yEval }
  return outputs
}

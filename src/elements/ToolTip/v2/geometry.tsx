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
  unconstrained?: boolean
  contentSize: Size
  anchor: Layout
  padding?: Padding
  windowDimensions: Size
  screenPadding?: Padding
  safeAreaInsets?: EdgeInsets
}

export interface GeometryOutputs {
  adjustedContentSize: Size
  pointerProps: { pointerPlacement: PointerPlacementType; mx?: number }
  toolTipOrigin: Point
  tooltipPlacement: ToolTipPlacementType
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

export const computeBottomGeometry = ({
  anchor,
  contentSize,
  padding,
  windowDimensions,
  safeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 },
  screenPadding,
  unconstrained,
}: GeometryInputs): GeometryOutputs => {
  console.debug("BOTTOM GEO INPUTS", {
    anchor,
    contentSize,
    padding,
    safeAreaInsets,
    screenPadding,
    unconstrained,
    windowDimensions,
  })
  const { top, bottom, left, right } = paddingToPx(padding)
  const maxWidth = windowDimensions.width
  const maxHeight = windowDimensions.height
  let tooltipPlacement: ToolTipPlacementType = "bottom"
  let pointerProps: GeometryOutputs["pointerProps"] = {
    pointerPlacement: "top",
    mx: undefined,
  }

  const adjustedContentSize: Size = {
    width: contentSize.width >= maxWidth ? maxWidth : -1,
    height: contentSize.height >= maxHeight ? maxHeight : -1,
  }

  const toolTipOrigin: Point = {
    x: anchor.x + anchor.width / 2.0 - contentSize.width / 2.0,
    y: unconstrained
      ? anchor.pageY - anchor.height / 2
      : anchor.y + contentSize.height / 2 + POINTER_SIZE.height,
  }

  // if tooltip origin is beyond left bounds
  if (toolTipOrigin.x <= 0) {
    toolTipOrigin.x = 5
    pointerProps = {
      pointerPlacement: "top-left",
      mx: anchor.width / 2 - left,
    }
  }

  // if tooltip origin is beyond right bounds
  if (toolTipOrigin.x > windowDimensions.width - contentSize.width) {
    toolTipOrigin.x = windowDimensions.width - contentSize.width - 5
    pointerProps = {
      pointerPlacement: "top-right",
      mx: anchor.width / 2 - right,
    }
  }

  // if tooltip origin is beyond bottom bounds
  if (!!unconstrained && toolTipOrigin.y + safeAreaInsets.bottom > windowDimensions.height) {
    tooltipPlacement = "top"
  } else if (
    !unconstrained &&
    anchor.pageY + contentSize.height + top + bottom + POINTER_SIZE.height + safeAreaInsets.bottom >
      windowDimensions.height
  ) {
    tooltipPlacement = "top"
  }

  return {
    adjustedContentSize,
    pointerProps,
    toolTipOrigin,
    tooltipPlacement,
  }
}

export const computeTopGeometry = ({
  anchor,
  contentSize,
  padding,
  safeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 },
  screenPadding,
  unconstrained,
  windowDimensions,
}: GeometryInputs): GeometryOutputs => {
  console.debug("TOP GEO INPUTS", {
    anchor,
    contentSize,
    padding,
    safeAreaInsets,
    screenPadding,
    unconstrained,
    windowDimensions,
  })
  const { top, bottom, left, right } = paddingToPx(padding)
  const screen = paddingToPx(screenPadding)
  const maxWidth = windowDimensions.width - (screen.left + screen.right)
  const maxHeight = windowDimensions.height - (screen.top + screen.bottom)

  const adjustedContentSize: Size = {
    width: Math.min(maxWidth, contentSize.width),
    height: Math.min(maxHeight, contentSize.height),
  }

  let tooltipPlacement: ToolTipPlacementType = "top"
  let pointerProps: GeometryOutputs["pointerProps"] = {
    pointerPlacement: "bottom",
    mx: undefined,
  }

  const toolTipOrigin: Point = {
    x: anchor.x + anchor.width / 2.0 - contentSize.width / 2.0,
    y: unconstrained
      ? anchor.y - bottom - adjustedContentSize.height - POINTER_SIZE.height
      : anchor.pageY - anchor.height / 2.0,
  }

  // if tooltip origin is beyond left bounds
  if (toolTipOrigin.x < 0) {
    toolTipOrigin.x = 5
    pointerProps = {
      pointerPlacement: "bottom-left",
      mx: anchor.width / 2 - left,
    }
  }

  // if tooltip origin is beyond right bounds
  if (toolTipOrigin.x > windowDimensions.width - contentSize.width) {
    toolTipOrigin.x = windowDimensions.width - contentSize.width - 5
    pointerProps = {
      pointerPlacement: "bottom-right",
      mx: anchor.width / 2 - right,
    }
  }

  // if tooltip origin is beyond top bounds
  if (unconstrained && toolTipOrigin.y - safeAreaInsets.top < 0) {
    tooltipPlacement = "bottom"
  } else if (
    !!unconstrained &&
    anchor.pageY - top - bottom - contentSize.height - safeAreaInsets.top < 0
  ) {
    tooltipPlacement = "bottom"
  }

  return {
    adjustedContentSize,
    pointerProps,
    toolTipOrigin,
    tooltipPlacement,
  }
}

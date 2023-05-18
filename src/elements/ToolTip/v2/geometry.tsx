import { DisplayInsets, PlacementType } from "./ToolTip"

export interface Size {
  width: number
  height: number
}
export interface Point {
  x: number
  y: number
}
export type Rectangle = Point & Size

export const swapSizeDimensions = (size: Size): Size => ({
  height: size.width,
  width: size.height,
})

interface GeometryInputs {
  arrowSize: Size
  adjustedContentSize: Size
  childRectangle: Rectangle
  childContentSpacing: number
  computedDisplayInsets: DisplayInsets
  windowDimensions: Size
}

export interface GeometryOutputs {
  toolTipOrigin: Point
  anchorPoint: Point
  placement: PlacementType
  adjustedContentSize: Size
}

export const makeChildlessRectangle = ({
  computedDisplayInsets,
  windowDimensions,
  computedPlacement,
}: {
  computedDisplayInsets: DisplayInsets
  windowDimensions: Size
  computedPlacement: PlacementType
}): Rectangle => {
  switch (computedPlacement) {
    case "bottom":
      return { x: windowDimensions.width / 2, y: computedDisplayInsets.top, width: 1, height: 1 }

    case "right":
      return { x: computedDisplayInsets.left, y: windowDimensions.height / 2, width: 1, height: 1 }

    case "left":
      return {
        x: windowDimensions.width - computedDisplayInsets.right!,
        y: windowDimensions.height / 2,
        width: 1,
        height: 1,
      }

    case "top":
    default:
      return {
        x: windowDimensions.width / 2,
        y: windowDimensions.height - computedDisplayInsets.bottom!,
        width: 1,
        height: 1,
      }
  }
}

export const computeCenterGeometry = ({
  childRectangle: childRect,
  adjustedContentSize: contentSize,
  computedDisplayInsets: computedDisplayInsets,
  windowDimensions: windowDimensions,
}: GeometryInputs): GeometryOutputs => {
  const maxWidth =
    windowDimensions.width - (computedDisplayInsets.left + computedDisplayInsets.right)
  const maxHeight =
    windowDimensions.height - (computedDisplayInsets.top + computedDisplayInsets.bottom)

  const adjustedContentSize: Size = {
    width: contentSize.width >= maxWidth ? maxWidth : -1,
    height: contentSize.height >= maxHeight ? maxHeight : -1,
  }

  const toolTipOrigin: Point = {
    x:
      adjustedContentSize.width === -1
        ? (maxWidth - contentSize.width) / 2 + computedDisplayInsets.left
        : computedDisplayInsets.left,
    y:
      adjustedContentSize.height === -1
        ? (maxHeight - contentSize.height) / 2 + computedDisplayInsets.top
        : computedDisplayInsets.top,
  }

  const anchorPoint = { x: childRect.x + childRect.width / 2.0, y: childRect.y }

  return {
    toolTipOrigin,
    anchorPoint,
    placement: "center",
    adjustedContentSize,
  }
}

export const computeTopGeometry = ({
  childRectangle,
  adjustedContentSize: contentSize,
  arrowSize,
  computedDisplayInsets,
  windowDimensions,
  childContentSpacing,
}: GeometryInputs): GeometryOutputs => {
  const maxWidth =
    windowDimensions.width - (computedDisplayInsets.left + computedDisplayInsets.right)

  const adjustedContentSize: Size = {
    width: Math.min(maxWidth, contentSize.width),
    height: contentSize.height,
  }

  const toolTipOrigin: Point = {
    x:
      contentSize.width >= maxWidth
        ? computedDisplayInsets.left
        : Math.max(
            computedDisplayInsets.left,
            childRectangle.x + (childRectangle.width - adjustedContentSize.width) / 2
          ),
    y: Math.max(
      computedDisplayInsets.top - childContentSpacing,
      childRectangle.y - contentSize.height - arrowSize.height - childContentSpacing
    ),
  }

  const anchorPoint: Point = {
    x: childRectangle.x + childRectangle.width / 2.0,
    y: childRectangle.y - childContentSpacing,
  }

  // make sure arrow does not extend beyond computedDisplayInsets
  if (anchorPoint.x + arrowSize.width > windowDimensions.width - computedDisplayInsets.right) {
    anchorPoint.x =
      windowDimensions.width -
      computedDisplayInsets.right -
      Math.abs(arrowSize.width - arrowSize.height) -
      8
  } else if (anchorPoint.x - arrowSize.width < computedDisplayInsets.left) {
    anchorPoint.x = computedDisplayInsets.left + Math.abs(arrowSize.width - arrowSize.height) + 8
  }

  const topPlacementBottomBound = anchorPoint.y - arrowSize.height

  if (toolTipOrigin.y + contentSize.height > topPlacementBottomBound) {
    adjustedContentSize.height = topPlacementBottomBound - toolTipOrigin.y
  }

  if (toolTipOrigin.x + contentSize.width > maxWidth) {
    toolTipOrigin.x =
      windowDimensions.width - computedDisplayInsets.right - adjustedContentSize.width
  }

  return {
    toolTipOrigin: toolTipOrigin,
    anchorPoint,
    placement: "top",
    adjustedContentSize,
  }
}

export const computeBottomGeometry = ({
  childRectangle: childRect,
  adjustedContentSize: contentSize,
  arrowSize,
  computedDisplayInsets,
  windowDimensions,
  childContentSpacing,
}: GeometryInputs): GeometryOutputs => {
  const maxWidth =
    windowDimensions.width - (computedDisplayInsets.left + computedDisplayInsets.right)

  const adjustedContentSize: Size = {
    width: Math.min(maxWidth, contentSize.width),
    height: contentSize.height,
  }

  const toolTipOrigin: Point = {
    x:
      contentSize.width >= maxWidth
        ? computedDisplayInsets.left
        : Math.max(
            computedDisplayInsets.left,
            childRect.x + (childRect.width - adjustedContentSize.width) / 2
          ),
    y: Math.min(
      windowDimensions.height - computedDisplayInsets.bottom + childContentSpacing,
      childRect.y + childRect.height + arrowSize.height + childContentSpacing
    ),
  }

  const anchorPoint: Point = {
    x: childRect.x + childRect.width / 2.0,
    y: childRect.y + childRect.height + childContentSpacing,
  }

  // make sure arrow does not extend beyond computedDisplayInsets
  if (anchorPoint.x + arrowSize.width > windowDimensions.width - computedDisplayInsets.right) {
    anchorPoint.x =
      windowDimensions.width -
      computedDisplayInsets.right -
      Math.abs(arrowSize.width - arrowSize.height) -
      8
  } else if (anchorPoint.x - arrowSize.width < computedDisplayInsets.left) {
    anchorPoint.x = computedDisplayInsets.left + Math.abs(arrowSize.width - arrowSize.height) + 8
  }

  if (
    toolTipOrigin.y + contentSize.height >
    windowDimensions.height - computedDisplayInsets.bottom
  ) {
    adjustedContentSize.height =
      windowDimensions.height - computedDisplayInsets.bottom - toolTipOrigin.y
  }

  if (toolTipOrigin.x + contentSize.width > maxWidth) {
    toolTipOrigin.x =
      windowDimensions.width - computedDisplayInsets.right - adjustedContentSize.width
  }

  return {
    toolTipOrigin: toolTipOrigin,
    anchorPoint,
    placement: "bottom",
    adjustedContentSize,
  }
}

export const computeLeftGeometry = ({
  childRectangle: childRect,
  adjustedContentSize: contentSize,
  arrowSize,
  computedDisplayInsets,
  windowDimensions,
  childContentSpacing,
}: GeometryInputs): GeometryOutputs => {
  const maxHeight =
    windowDimensions.height - (computedDisplayInsets.top + computedDisplayInsets.bottom)

  const adjustedContentSize: Size = {
    width: contentSize.width,
    height: Math.min(maxHeight, contentSize.height),
  }

  const toolTipOrigin: Point = {
    x: Math.max(
      computedDisplayInsets.left - childContentSpacing,
      childRect.x - contentSize.width - arrowSize.width - childContentSpacing
    ),
    y:
      contentSize.height >= maxHeight
        ? computedDisplayInsets.top
        : Math.max(
            computedDisplayInsets.top,
            childRect.y + (childRect.height - adjustedContentSize.height) / 2
          ),
  }

  const anchorPoint: Point = {
    x: childRect.x - childContentSpacing,
    y: childRect.y + childRect.height / 2.0,
  }

  // make sure arrow does not extend beyond computedDisplayInsets
  if (anchorPoint.y + arrowSize.width > windowDimensions.height - computedDisplayInsets.bottom) {
    anchorPoint.y =
      windowDimensions.height -
      computedDisplayInsets.bottom -
      Math.abs(arrowSize.height - arrowSize.width) -
      8
  } else if (anchorPoint.y - arrowSize.height < computedDisplayInsets.top) {
    anchorPoint.y = computedDisplayInsets.top + Math.abs(arrowSize.height - arrowSize.width) + 8
  }

  const leftPlacementRightBound = anchorPoint.x - arrowSize.width

  if (toolTipOrigin.x + contentSize.width > leftPlacementRightBound) {
    adjustedContentSize.width = leftPlacementRightBound - toolTipOrigin.x
  }

  if (toolTipOrigin.y + contentSize.height > maxHeight) {
    toolTipOrigin.y =
      windowDimensions.height - computedDisplayInsets.bottom - adjustedContentSize.height
  }

  return {
    toolTipOrigin: toolTipOrigin,
    anchorPoint,
    placement: "left",
    adjustedContentSize,
  }
}

export const computeRightGeometry = ({
  childRectangle: childRect,
  adjustedContentSize: contentSize,
  arrowSize,
  computedDisplayInsets,
  windowDimensions,
  childContentSpacing,
}: GeometryInputs): GeometryOutputs => {
  const maxHeight =
    windowDimensions.height - (computedDisplayInsets.top + computedDisplayInsets.bottom)

  const adjustedContentSize: Size = {
    width: contentSize.width,
    height: Math.min(maxHeight, contentSize.height),
  }

  const toolTipOrigin: Point = {
    x: Math.min(
      windowDimensions.width - computedDisplayInsets.right + childContentSpacing,
      childRect.x + childRect.width + arrowSize.width + childContentSpacing
    ),
    y:
      contentSize.height >= maxHeight
        ? computedDisplayInsets.top
        : Math.max(
            computedDisplayInsets.top,
            childRect.y + (childRect.height - adjustedContentSize.height) / 2
          ),
  }

  const anchorPoint: Point = {
    x: childRect.x + childRect.width + childContentSpacing,
    y: childRect.y + childRect.height / 2.0,
  }

  // make sure arrow does not extend beyond computedDisplayInsets
  if (anchorPoint.y + arrowSize.width > windowDimensions.height - computedDisplayInsets.bottom) {
    anchorPoint.y =
      windowDimensions.height -
      computedDisplayInsets.bottom -
      Math.abs(arrowSize.height - arrowSize.width) -
      8
  } else if (anchorPoint.y - arrowSize.height < computedDisplayInsets.top) {
    anchorPoint.y = computedDisplayInsets.top + Math.abs(arrowSize.height - arrowSize.width) + 8
  }

  if (toolTipOrigin.x + contentSize.width > windowDimensions.width - computedDisplayInsets.right) {
    adjustedContentSize.width =
      windowDimensions.width - computedDisplayInsets.right - toolTipOrigin.x
  }

  if (toolTipOrigin.y + contentSize.height > maxHeight) {
    toolTipOrigin.y =
      windowDimensions.height - computedDisplayInsets.bottom - adjustedContentSize.height
  }

  return {
    toolTipOrigin,
    anchorPoint,
    placement: "right",
    adjustedContentSize,
  }
}

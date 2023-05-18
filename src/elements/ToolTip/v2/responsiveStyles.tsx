import { StyleSheet } from "react-native"
import { DisplayInsets, PlacementType } from "./Tooltip"
import { Point, Size } from "./geometry"

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
    backgroundColor: "#8a01f9",
    zIndex: 500,
  },
  containerVisible: {
    opacity: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  tooltip: {
    backgroundColor: "#8a01f9",
    position: "absolute",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  content: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
    borderTopColor: "#8a01f9",
    borderRightColor: "#8a01f9",
    borderBottomColor: "#8a01f9",
    borderLeftColor: "#8a01f9",
  },
})

const arrowRotationForPlacement = (placement: PlacementType) => {
  switch (placement) {
    case "bottom":
      return "180deg"
    case "left":
      return "-90deg"
    case "right":
      return "90deg"
    default:
      return "0deg"
  }
}

const arrowPlacementStyles = ({
  anchorPoint,
  arrowSize,
  computedPlacement,
  toolTipOrigin,
}: {
  anchorPoint: Point
  arrowSize: Size
  computedPlacement: PlacementType
  toolTipOrigin: Point
}) => {
  // Create the arrow from a rectangle with the appropriate borderXWidth set
  // A rotation is then applied dependending on the placement
  // Also make it slightly bigger
  // to fix a visual artifact when the tooltip is animated with a scale
  const width = arrowSize.width + 2
  const height = arrowSize.height * 2 + 2
  let marginTop = 0
  let marginLeft = 0

  if (computedPlacement === "bottom") {
    marginTop = arrowSize.height
  } else if (computedPlacement === "right") {
    marginLeft = arrowSize.height
  }

  return {
    left: anchorPoint.x - toolTipOrigin.x - (width / 2 - marginLeft),
    top: anchorPoint.y - toolTipOrigin.y - (height / 2 - marginTop),
    width,
    height,
    borderTopWidth: height / 2,
    borderRightWidth: width / 2,
    borderBottomWidth: height / 2,
    borderLeftWidth: width / 2,
  }
}

const getArrowRotation = (arrowStyle: any, placement: PlacementType) => {
  // prevent rotation getting incorrectly overwritten
  const arrowRotation = arrowRotationForPlacement(placement)
  const transform = (StyleSheet.flatten(arrowStyle).transform || []).slice(0)
  transform.unshift({ rotate: arrowRotation })

  return { transform }
}

const tooltipPlacementStyles = ({
  arrowSize,
  placement,
  toolTipOrigin,
}: {
  arrowSize: Size
  placement: PlacementType
  toolTipOrigin: Point
}) => {
  const { height } = arrowSize

  switch (placement) {
    case "bottom":
      return {
        paddingTop: height,
        top: toolTipOrigin.y - height,
        left: toolTipOrigin.x,
      }
    case "top":
      return {
        paddingBottom: height,
        top: toolTipOrigin.y,
        left: toolTipOrigin.x,
      }
    case "right":
      return {
        paddingLeft: height,
        top: toolTipOrigin.y,
        left: toolTipOrigin.x - height,
      }
    case "left":
      return {
        paddingRight: height,
        top: toolTipOrigin.y,
        left: toolTipOrigin.x,
      }
    case "center":
    default:
      return {
        top: toolTipOrigin.y,
        left: toolTipOrigin.x,
      }
  }
}

export const styleGenerator = (props: {
  adjustedContentSize: Size
  anchorPoint: Point
  arrowSize: Size
  computedDisplayInsets: DisplayInsets
  computedPlacement: PlacementType
  measurementsFinished: boolean
  toolTipOrigin: Point
  topAdjustment: number
}) => {
  const {
    adjustedContentSize,
    anchorPoint,
    arrowSize,
    computedDisplayInsets,
    computedPlacement,
    measurementsFinished,
    toolTipOrigin,
    topAdjustment,
  } = props

  const { height, width } = adjustedContentSize

  const contentStyle = [
    styles.content,
    height > 0 && { height }, // ignore special case of -1 with center placement (and 0 when not yet measured)
    width > 0 && { width }, // ignore special case of -1 with center placement (and 0 when not yet measured)
  ]

  const arrowStyle = [
    styles.arrow,
    arrowPlacementStyles({ anchorPoint, arrowSize, computedPlacement, toolTipOrigin }),
    { borderTopColor: "black" },
  ]

  return {
    arrowStyle: [...arrowStyle, getArrowRotation(arrowStyle, computedPlacement)],
    backgroundStyle: [
      styles.background,
      {
        paddingTop: computedDisplayInsets.top,
        paddingLeft: computedDisplayInsets.left,
        paddingRight: computedDisplayInsets.right,
        paddingBottom: computedDisplayInsets.bottom,
      },
    ],
    containerStyle: [
      styles.container,
      StyleSheet.compose<{ opacity?: number; top?: number }>(
        adjustedContentSize.width !== 0 && measurementsFinished && styles.containerVisible,
        topAdjustment !== 0 && {
          top: topAdjustment,
        }
      ),
    ],
    contentStyle,
    tooltipStyle: [
      styles.tooltip,
      tooltipPlacementStyles({ arrowSize, placement: computedPlacement, toolTipOrigin }),
    ],
  }
}

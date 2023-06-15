import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { isEqual } from "lodash"
import { FC, PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { TouchableWithoutFeedback, View, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDeepCompareEffect, useDeepCompareCallback } from "use-deep-compare"
import { Pointer, PointerPlacementType } from "./Pointer"
import {
  GeometryOutputs,
  Layout,
  Point,
  Size,
  computeToolTipOriginPoint,
  evaluateForXYAxisOverflow,
} from "./geometry"
import { Box } from "../../Box"
import { Text } from "../../Text"

export interface Padding {
  top?: SpacingUnit | 0
  bottom?: SpacingUnit | 0
  left?: SpacingUnit | 0
  right?: SpacingUnit | 0
}

export type ToolTipPlacementType = "top" | "bottom"

/**
 * ToolTipV2
 * @param padding Padding around the content of the tooltip
 * @param isVisible Whether or not the tooltip is visible
 * @param onClose Callback for when the tooltip is closed
 * @param placement Where the tooltip should be placed relative to the child
 * @param unconstrained Default is false. If this is true, the tooltip will be positioned relative to the window coordinate grid, instead of its immediate parent.
 */
export interface ToolTipProps extends PropsWithChildren {
  content?: string
  height?: number
  title?: string
  isVisible?: boolean
  padding?: Partial<Padding>
  maxHeight?: number
  maxWidth?: number
  onClose?: Function
  placement?: ToolTipPlacementType
  useInteractionManager?: boolean
  unconstrained?: boolean
  width?: number
}

// TODO: Animation
export const ToolTip: FC<ToolTipProps> = ({
  children,
  content,
  isVisible = false,
  onClose = () => {
    console.warn("ToolTip onClose not implemented")
  },
  padding,
  placement = "bottom",
  title,
  unconstrained,
  ...rest // maxWidth, maxHeight, width, height
}) => {
  const wrapperRef = useRef<View | null>(null)
  const anchorRef = useRef<Layout | null>(null)
  const contentRef = useRef<View | null>(null)

  const windowDimensions = useWindowDimensions()
  const safeAreaInsets = useSafeAreaInsets()
  const paddingAggregate: Padding = useMemo(
    () => ({ top: 1, bottom: 1, left: 1, right: 1, ...padding }),
    [padding]
  )
  const [contentSize, setContentSize] = useState<Size>({ width: 0, height: 0 })
  const [pointerProps, setPointerProps] = useState<{
    pointerPlacement: PointerPlacementType
    // mx is used in the case that we are centering the
    // pointer to a left or right aligned anchor
    mx?: number
  }>({ pointerPlacement: "top" })
  const [origin, setOrigin] = useState<Point | null>({ x: 0, y: 0 })
  const [adjustedOrigin, setAdjustedOrigin] = useState<Point | null>(null)
  const [toolTipPlacement, setToolTipPlacement] = useState<ToolTipPlacementType>(placement)
  const [geometry, setGeometry] = useState<GeometryOutputs | null>(null)

  const measureAnchorRectangle = useDeepCompareCallback(
    (toolTipPlacement: ToolTipPlacementType) => {
      if (wrapperRef.current?.measure) {
        wrapperRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (isEqual(anchorRef.current, { x, y, width, height, pageX, pageY })) return
          anchorRef.current = { x, y, width, height, pageX, pageY }
          setOrigin(() => {
            if (anchorRef.current === null) return null
            const point = computeToolTipOriginPoint({
              anchor: anchorRef.current,
              contentSize,
              padding: paddingAggregate,
              toolTipPlacement,
              unconstrained,
            })
            return point
          })
        })
      }
    },
    [contentSize, paddingAggregate, unconstrained]
  )

  const measureTooltipContentRectangle = useDeepCompareCallback(() => {
    if (contentRef.current?.measure) {
      contentRef.current.measure((x, y, width, height) => {
        if (isEqual(contentSize, { width, height })) return
        setContentSize({ width, height })
      })
    }
  }, [contentSize])

  const computeGeometry = useDeepCompareCallback(() => {
    if (!origin || !anchorRef.current || contentSize.width === 0 || contentSize.height === 0) return

    const outputs: GeometryOutputs = evaluateForXYAxisOverflow({
      anchor: anchorRef.current,
      contentSize,
      padding: paddingAggregate,
      toolTipPlacement,
      safeAreaInsets,
      toolTipOrigin: origin, // we always want to do computations with the true origin point
      windowDimensions,
      unconstrained,
    })
    if (!isEqual(outputs, geometry)) {
      setGeometry(outputs)
    }
  }, [
    contentSize,
    geometry,
    origin,
    paddingAggregate,
    safeAreaInsets,
    toolTipPlacement,
    unconstrained,
    windowDimensions,
  ])

  useDeepCompareEffect(() => {
    if (geometry && geometry.toolTipPlacement !== toolTipPlacement) {
      setToolTipPlacement(geometry.toolTipPlacement)
      measureAnchorRectangle(geometry.toolTipPlacement)
    }
    if (geometry && !isEqual(geometry.pointerProps, pointerProps)) {
      setPointerProps(geometry.pointerProps)
    }
    if (
      geometry &&
      !isEqual(geometry.toolTipOrigin, origin) &&
      !isEqual(geometry.toolTipOrigin, adjustedOrigin)
    ) {
      setAdjustedOrigin(geometry.toolTipOrigin)
    } else if (geometry && isEqual(geometry.toolTipOrigin, origin) && adjustedOrigin !== null) {
      setAdjustedOrigin(null)
    }
  }, [adjustedOrigin, geometry, measureAnchorRectangle, origin, pointerProps, toolTipPlacement])

  useDeepCompareEffect(() => {
    if (isVisible) {
      measureTooltipContentRectangle()
    }
  }, [isVisible, measureTooltipContentRectangle])

  useEffect(() => {
    computeGeometry()
  }, [computeGeometry])

  return (
    <>
      <Box ref={wrapperRef as any} onLayout={() => measureAnchorRectangle(toolTipPlacement)}>
        {children}
      </Box>

      {isVisible && origin && (
        <Box
          display="flex"
          position="absolute"
          left={adjustedOrigin?.x ?? origin.x}
          top={adjustedOrigin?.y ?? origin.y}
        >
          <Pointer {...pointerProps}>
            <Box
              ref={contentRef as any}
              onLayout={measureTooltipContentRectangle}
              backgroundColor="black100"
              pt={paddingAggregate.top}
              pb={paddingAggregate.bottom}
              pl={paddingAggregate.left}
              pr={paddingAggregate.right}
              {...rest}
            >
              <TouchableWithoutFeedback onPress={() => onClose()}>
                <>
                  {!!title && (
                    <Text color="white100" variant="sm-display">
                      {title}
                    </Text>
                  )}
                  {!!content && (
                    <Text color="white100" variant="xs">
                      {content}
                    </Text>
                  )}
                </>
              </TouchableWithoutFeedback>
            </Box>
          </Pointer>
        </Box>
      )}
    </>
  )
}

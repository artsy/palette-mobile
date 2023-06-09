import { SpacingUnit } from "@artsy/palette-tokens/dist/themes/v3"
import { isEqual } from "lodash"
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  InteractionManager,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Pointer } from "./Pointer"
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

interface InteractionManagerPromise {
  then: (onfulfilled?: () => any, onrejected?: () => any) => Promise<any>
  done: (...args: any[]) => any
  cancel: () => void
}

export interface Padding {
  top?: SpacingUnit | 0
  bottom?: SpacingUnit | 0
  left?: SpacingUnit | 0
  right?: SpacingUnit | 0
}

export type ToolTipPlacementType = "top" | "bottom"
export type PointerPlacementType =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"

interface ToolTipProps extends PropsWithChildren {
  title?: string
  content?: string
  padding?: Partial<Padding>
  isVisible?: boolean
  onClose?: Function
  placement?: ToolTipPlacementType
  useInteractionManager?: boolean
  unconstrained?: boolean
  maxWidth?: number
  maxHeight?: number
  width?: number
  height?: number
}

/**
 *
 * @param padding Padding around the content of the tooltip
 * @param isVisible Whether or not the tooltip is visible
 * @param onClose Callback for when the tooltip is closed
 * @param placement Where the tooltip should be placed relative to the child
 * @param unconstrained Whether or not the tooltip should be constrained by its immediate parent (this should almost always be false)
 */
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
  useInteractionManager = false,
  ...rest // maxWidth, maxHeight, width, height
}) => {
  const interactionPromise = useRef<InteractionManagerPromise | null>(null)
  const wrapperRef = useRef<View | null>(null)
  const anchorRef = useRef<Layout | null>(null)

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
  const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 })
  const [overflowOrigin, setOverflowOrigin] = useState<Point | null>(null)
  const [tooltipPlacement, setTooltipPlacement] = useState<ToolTipPlacementType>(placement)

  const measureChildRectangle = () => {
    const doMeasurement = () => {
      if (wrapperRef.current?.measure) {
        wrapperRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (isEqual(anchorRef.current, { x, y, width, height, pageX, pageY })) return
          anchorRef.current = { x, y, width, height, pageX, pageY }
          setOrigin((prev) => {
            if (anchorRef.current === null) return prev
            return computeToolTipOriginPoint(
              anchorRef.current,
              contentSize,
              paddingAggregate,
              tooltipPlacement,
              unconstrained
            )
          })
        })
      }
    }

    if (useInteractionManager) {
      if (interactionPromise.current) {
        interactionPromise.current.cancel()
      }
      interactionPromise.current = InteractionManager.runAfterInteractions(() => {
        doMeasurement()
      })
    } else {
      doMeasurement()
    }
  }

  const computeGeometry = useCallback(() => {
    const geometry: GeometryOutputs = evaluateForXYAxisOverflow(
      anchorRef.current!,
      contentSize,
      paddingAggregate,
      tooltipPlacement,
      safeAreaInsets,
      origin,
      windowDimensions,
      unconstrained
    )

    if (!isEqual(geometry.pointerProps, pointerProps)) {
      setPointerProps(geometry.pointerProps)
    }

    /**
     * we want to do computations with the true origin point,
     * so we shouldn't make any manual adjustments to that value.
     * instead we set and use the overflow origin for
     * the case in which such adjustments are necessary.
     */
    if (!isEqual(geometry.toolTipOrigin, origin)) {
      setOverflowOrigin(geometry.toolTipOrigin)
    } else if (isEqual(geometry.toolTipOrigin, origin) && overflowOrigin !== null) {
      setOverflowOrigin(null)
    }

    if (geometry.toolTipPlacement !== tooltipPlacement) {
      setTooltipPlacement(geometry.toolTipPlacement)
    }
  }, [
    contentSize,
    paddingAggregate,
    tooltipPlacement,
    safeAreaInsets,
    origin,
    windowDimensions,
    unconstrained,
    pointerProps,
    overflowOrigin,
  ])

  const renderContent = () => {
    return (
      <Box
        display={isVisible ? "flex" : "none"}
        position="absolute"
        left={overflowOrigin?.x ?? origin.x}
        top={overflowOrigin?.y ?? origin.y}
      >
        <Pointer {...pointerProps}>
          <Box
            onLayout={(event: LayoutChangeEvent) => {
              const { width, height } = event.nativeEvent.layout
              setContentSize((prev) => {
                if (isEqual(prev, { width, height })) return prev
                return { width, height }
              })
            }}
            backgroundColor="black100"
            borderRadius={4}
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
    )
  }

  useEffect(() => {
    console.log("tooltip origin: ", origin)
    console.log("overflow origin: ", overflowOrigin)

    if (isVisible && anchorRef.current) {
      computeGeometry()
    }
  }, [isVisible, computeGeometry])

  return (
    <>
      <Box ref={wrapperRef as any} onLayout={measureChildRectangle}>
        <TouchableWithoutFeedback onPress={() => onClose()}>{children}</TouchableWithoutFeedback>
      </Box>

      {isVisible && renderContent()}
    </>
  )
}

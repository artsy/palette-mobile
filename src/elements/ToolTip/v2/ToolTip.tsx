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
 * @param unconstrained Default is false. If this is true, the tooltip will be positioned relative to the window coordinate grid, instead of its immediate parent.
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

  // wrapperRef allows us to take measurements of
  // the component we intend to anchor to
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
  const [origin, setOrigin] = useState<Point | null>({ x: 0, y: 0 })
  const [adjustedOrigin, setAdjustedOrigin] = useState<Point | null>(null)
  const [toolTipPlacement, setToolTipPlacement] = useState<ToolTipPlacementType>(placement)

  const measureChildRectangle = () => {
    const doMeasurement = () => {
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
    if (origin === null || anchorRef.current === null) return

    const geometry: GeometryOutputs = evaluateForXYAxisOverflow({
      anchor: anchorRef.current,
      contentSize,
      padding: paddingAggregate,
      toolTipPlacement,
      safeAreaInsets,
      toolTipOrigin: origin, // we want to do computations with the true origin point
      windowDimensions,
      unconstrained,
    })

    if (!isEqual(geometry.pointerProps, pointerProps)) {
      setPointerProps(geometry.pointerProps)
    }

    /**
     * we want to do computations with the true origin point,
     * so we shouldn't make any manual adjustments to that value.
     * instead we set and use the overflow origin for
     * the case in which such adjustments are necessary.
     */
    if (
      !isEqual(geometry.toolTipOrigin, origin) &&
      !isEqual(geometry.toolTipOrigin, adjustedOrigin)
    ) {
      setAdjustedOrigin(geometry.toolTipOrigin)
    } else if (isEqual(geometry.toolTipOrigin, origin) && adjustedOrigin !== null) {
      setAdjustedOrigin(null)
    }

    if (geometry.toolTipPlacement !== toolTipPlacement) {
      setToolTipPlacement(geometry.toolTipPlacement)
    }
  }, [
    contentSize,
    paddingAggregate,
    toolTipPlacement,
    safeAreaInsets,
    origin,
    windowDimensions,
    unconstrained,
    pointerProps,
    adjustedOrigin,
  ])

  const renderContent = () => {
    if (origin === null) return null
    return (
      <Box
        display={isVisible ? "flex" : "none"}
        position="absolute"
        left={adjustedOrigin?.x ?? origin.x}
        top={adjustedOrigin?.y ?? origin.y}
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
    if (isVisible && anchorRef.current) {
      computeGeometry()
    }
  }, [isVisible, computeGeometry])

  return (
    <>
      <Box ref={wrapperRef as any} onLayout={measureChildRectangle}>
        {children}
      </Box>

      {isVisible && renderContent()}
    </>
  )
}

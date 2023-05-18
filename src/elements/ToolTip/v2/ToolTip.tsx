import { isEqual } from "lodash"
import {
  Children,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  Dimensions,
  EmitterSubscription,
  InteractionManager,
  LayoutChangeEvent,
  ScaledSize,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { ToolTipContextProvider } from "./TooltipContextProvider"
import {
  GeometryOutputs,
  Point,
  Rectangle,
  Size,
  computeBottomGeometry,
  computeCenterGeometry,
  computeLeftGeometry,
  computeRightGeometry,
  computeTopGeometry,
  makeChildlessRectangle,
  swapSizeDimensions,
} from "./geometry"
import { styleGenerator } from "./responsiveStyles"

interface InteractionManagerPromise {
  then: (onfulfilled?: () => any, onrejected?: () => any) => Promise<any>
  done: (...args: any[]) => any
  cancel: () => void
}

export interface DisplayInsets {
  top: number
  bottom: number
  left: number
  right: number
}

export type PlacementType = "top" | "left" | "bottom" | "right" | "center"

interface ToolTipProps {
  allowChildInteraction?: boolean
  arrowSize?: Size
  childContentSpacing?: number
  closeOnChildInteraction?: boolean
  closeOnContentInteraction?: boolean
  closeOnBackgroundInteraction?: boolean
  content?: ReactNode
  displayInsets?: Partial<DisplayInsets>
  disableShadow?: boolean
  isVisible?: boolean
  onClose?: Function
  placement?: PlacementType
  showChildInToolTip?: boolean
  supportedOrientations?: string[]
  useInteractionManager?: boolean
  useReactNativeModal?: boolean
  topAdjustment?: number
  horizontalAdjustment?: number
  accessible?: boolean
}

export const ToolTip: FC<ToolTipProps & PropsWithChildren> = ({
  allowChildInteraction = true,
  arrowSize = { height: 16, width: 8 },
  childContentSpacing = 4,
  children,
  closeOnChildInteraction = true,
  closeOnContentInteraction = true,
  closeOnBackgroundInteraction = true,
  content = <View />,
  displayInsets,
  isVisible = false,
  onClose = () => {
    console.warn("ToolTip onClose not implemented")
  },
  placement = "center",
  showChildInToolTip = true,
  useInteractionManager = false,
  topAdjustment = 0,
  horizontalAdjustment = 0,
  accessible = true,
}) => {
  // const firstRender = useRef<boolean>(true)
  const isMeasuringChild = useRef<boolean>(false)
  const interactionPromise = useRef<InteractionManagerPromise | null>(null)
  const dimensionsSubscription = useRef<EmitterSubscription | null>(null)
  const wrapperRef = useRef<View>(null)

  const [adjustedContentSize, setAdjustedContentSize] = useState<Size>({ width: 0, height: 0 })
  const [anchorPoint, setAnchorPoint] = useState<Point>({ x: 0, y: 0 })
  const [childRectangle, setChildRectangle] = useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [computedDisplayInsets, setComputedDisplayInsets] = useState<DisplayInsets>({
    top: 24,
    bottom: 24,
    left: 24,
    right: 24,
    ...displayInsets,
  })
  const [computedPlacement, setComputedPlacement] = useState(
    Children.count(children) > 0 ? placement : "center"
  )
  const [contentSize, setContentSize] = useState<Size>({ width: 0, height: 0 })
  const [measurementsFinished, setMeasurementsFinished] = useState<boolean>(false)
  const [toolTipOrigin, setToolTipOrigin] = useState<Point>({ x: 0, y: 0 })
  const [windowDimensions, setWindowDimensions] = useState<ScaledSize>(Dimensions.get("window"))
  const [waitingForInteractions, setWaitingForInteractions] = useState<boolean>(
    isVisible && useInteractionManager
  )

  const invertPlacement = (placement: PlacementType): PlacementType => {
    switch (placement) {
      case "top":
        return "bottom"
      case "bottom":
        return "top"
      case "right":
        return "left"
      case "left":
        return "right"
      default:
        return placement
    }
  }

  const handleChildMeasurementComplete = (childRect: Rectangle) => {
    setChildRectangle(childRect)
    setWaitingForInteractions(false)
  }

  const handleChildlessPlacement = () => {
    handleChildMeasurementComplete(
      makeChildlessRectangle({
        computedDisplayInsets,
        computedPlacement,
        windowDimensions,
      })
    )
  }

  const measureContent = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }, [])

  const measureChildRectangle = () => {
    const doMeasurement = () => {
      if (!isMeasuringChild.current) {
        isMeasuringChild.current = true

        if (wrapperRef.current?.measure) {
          wrapperRef.current.measure((x, y, width, height, pageX, pageY) => {
            const childRect: Rectangle = { x: pageX, y: pageY, width, height }
            if (Object.values(childRect).every((value) => value !== undefined)) {
              handleChildMeasurementComplete(childRect)
            } else {
              handleChildlessPlacement()
            }
          })
        } else {
          handleChildlessPlacement()
        }
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
    const options = {
      computedDisplayInsets,
      childRectangle,
      windowDimensions,
      arrowSize:
        computedPlacement === "top" || computedPlacement === "bottom"
          ? arrowSize
          : swapSizeDimensions(arrowSize),
      childContentSpacing,
      adjustedContentSize,
    }

    let geometry: GeometryOutputs
    if (placement === "center" && Children.count(children) === 0) {
      geometry = computeCenterGeometry(options)
    } else {
      switch (placement) {
        case "bottom":
          geometry = computeBottomGeometry(options)
          break
        case "left":
          geometry = computeLeftGeometry(options)
          break
        case "right":
          geometry = computeRightGeometry(options)
          break
        case "top":
        default:
          geometry = computeTopGeometry(options)
          break
      }
    }
    setToolTipOrigin(geometry.toolTipOrigin)
    setAnchorPoint(geometry.anchorPoint)
    setComputedPlacement(geometry.placement)
    setAdjustedContentSize(geometry.adjustedContentSize)
    setMeasurementsFinished(!!childRectangle.width && !!contentSize.width)
  }, [
    computedDisplayInsets,
    childRectangle,
    windowDimensions,
    computedPlacement,
    arrowSize,
    childContentSpacing,
    adjustedContentSize,
    placement,
    children,
    contentSize.width,
  ])

  const renderChildInToolTip = () => {
    let x = childRectangle.x

    if (horizontalAdjustment) {
      x = x + horizontalAdjustment
    }

    const onTouchEnd = () => {
      if (closeOnChildInteraction) {
        onClose()
      }
    }

    return (
      <ToolTipContextProvider value={{ ToolTipDuplicate: true }}>
        <View
          onTouchEnd={onTouchEnd}
          pointerEvents={allowChildInteraction ? "box-none" : "none"}
          style={{
            position: "absolute",
            height: childRectangle.height,
            width: childRectangle.width,
            top: childRectangle.y,
            left: x,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </ToolTipContextProvider>
    )
  }

  const renderContent = () => {
    const generatedStyles = styleGenerator({
      adjustedContentSize,
      anchorPoint,
      arrowSize,
      computedDisplayInsets,
      measurementsFinished,
      computedPlacement,
      toolTipOrigin,
      topAdjustment,
    })

    const hasChildren = Children.count(children) > 0

    const onPressBackground = () => {
      if (closeOnBackgroundInteraction) {
        onClose()
      }
    }

    const onPressContent = () => {
      if (closeOnContentInteraction) {
        onClose()
      }
    }

    return (
      <TouchableWithoutFeedback onPress={onPressBackground} accessible={accessible}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: 0,
            backgroundColor: "transparent",
            zIndex: 500,
          }}
        >
          <View style={[generatedStyles.backgroundStyle]}>
            <View style={generatedStyles.tooltipStyle}>
              {hasChildren ? <View style={generatedStyles.arrowStyle} /> : null}
              <View onLayout={measureContent} style={generatedStyles.contentStyle}>
                <TouchableWithoutFeedback onPress={onPressContent} accessible={accessible}>
                  {content}
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          {hasChildren && showChildInToolTip ? renderChildInToolTip() : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  useEffect(() => {
    dimensionsSubscription.current = Dimensions.addEventListener("change", () => {
      setWindowDimensions(() => Dimensions.get("window"))
    })
  }, [])

  useEffect(() => {
    isMeasuringChild.current = false
    if (contentSize.width) {
      console.log("compute geometry")
      computeGeometry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childRectangle, contentSize])

  return (
    <>
      {Children.count(children) > 0 && (
        <View ref={wrapperRef as any} onLayout={measureChildRectangle}>
          {children}
        </View>
      )}

      {isVisible && renderContent()}
    </>
  )
}

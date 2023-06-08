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
import {
  GeometryInputs,
  GeometryOutputs,
  Layout,
  Point,
  Size,
  computeBottomGeometry,
  computeTopGeometry,
} from "./geometry"
import { Box } from "../../Box"
import { Flex } from "../../Flex"
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
}

/**
 *
 * @param padding Padding around the content of the tooltip
 * @param isVisible Whether or not the tooltip is visible
 * @param onClose Callback for when the tooltip is closed
 * @param placement Where the tooltip should be placed relative to the child
 * @param unconstrained Whether or not the tooltip should be constrained by its immediate parent (this should almost always be false)
 */
export const ToolTip: FC<ToolTipProps> = ({
  children,
  padding,
  isVisible = false,
  onClose = () => {
    console.warn("ToolTip onClose not implemented")
  },
  placement = "bottom",
  useInteractionManager = false,
  title,
  content,
  unconstrained,
}) => {
  const interactionPromise = useRef<InteractionManagerPromise | null>(null)
  const wrapperRef = useRef<View>(null)

  const windowDimensions = useWindowDimensions()
  const safeAreaInsets = useSafeAreaInsets()
  const paddingAggregate: Padding = useMemo(
    () => ({ top: 2, bottom: 2, left: 2, right: 2, ...padding }),
    [padding]
  )

  const [adjustedContentSize, setAdjustedContentSize] = useState<Size>({ width: 0, height: 0 })
  const [anchor, setAnchor] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  })
  const [contentSize, setContentSize] = useState<Size>({ width: 0, height: 0 })
  const [pointerProps, setPointerProps] = useState<{
    pointerPlacement: PointerPlacementType
    // mx is used in the case that we are centering the
    // pointer to a left or right aligned anchor
    mx?: number
  }>({ pointerPlacement: "top" })
  const [toolTipOrigin, setToolTipOrigin] = useState<Point>({ x: 0, y: 0 })
  const [tooltipPlacement, setTooltipPlacement] = useState<ToolTipPlacementType>(placement)

  const measureContent = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }, [])

  const measureChildRectangle = () => {
    const doMeasurement = () => {
      if (wrapperRef.current?.measure) {
        wrapperRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (
            isEqual(anchor, {
              x,
              y,
              width,
              height,
              pageX,
              pageY,
            })
          ) {
            return
          }
          setAnchor({
            x,
            y,
            width,
            height,
            pageX,
            pageY,
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
    const inputs: GeometryInputs = {
      padding: paddingAggregate,
      anchor,
      safeAreaInsets,
      windowDimensions,
      contentSize,
      unconstrained,
    }

    let geometry: GeometryOutputs

    switch (tooltipPlacement) {
      case "top":
        geometry = computeTopGeometry(inputs)
        break
      case "bottom":
      default:
        geometry = computeBottomGeometry(inputs)
        break
    }

    setPointerProps(geometry.pointerProps)
    setToolTipOrigin(geometry.toolTipOrigin)
    setAdjustedContentSize(geometry.adjustedContentSize)
    if (geometry.tooltipPlacement !== tooltipPlacement) {
      setTooltipPlacement(geometry.tooltipPlacement)
    }
  }, [
    paddingAggregate,
    anchor,
    safeAreaInsets,
    windowDimensions,
    contentSize,
    unconstrained,
    tooltipPlacement,
  ])

  const positionPointer = (
    pointerPlacement: PointerPlacementType
  ): {
    rotate: "0deg" | "180deg"
    flexDirection: "column" | "column-reverse"
    alignSelf: "flex-start" | "flex-end" | "center"
  } => {
    const top = {
      rotate: "0deg",
      flexDirection: "column",
    } as const
    const bottom = {
      rotate: "180deg",
      flexDirection: "column-reverse",
    } as const

    switch (pointerPlacement) {
      case "bottom-right":
        return {
          ...bottom,
          alignSelf: "flex-end",
        }
      case "bottom-left":
        return {
          ...bottom,
          alignSelf: "flex-start",
        }
      case "bottom":
        return {
          ...bottom,
          alignSelf: "center",
        }
      case "top-right":
        return {
          ...top,
          alignSelf: "flex-end",
        }
      case "top-left":
        return {
          ...top,
          alignSelf: "flex-start",
        }
      case "top":
      default:
        return {
          ...top,
          alignSelf: "center",
        }
    }
  }

  const renderContent = () => {
    const onPressContent = () => {
      onClose()
    }

    const { rotate, flexDirection, alignSelf } = positionPointer(pointerProps.pointerPlacement)

    return (
      <Box
        display={isVisible ? "flex" : "none"}
        position="absolute"
        flexDirection={flexDirection}
        left={toolTipOrigin.x}
        top={toolTipOrigin.y}
      >
        <Pointer rotate={rotate} alignSelf={alignSelf} mx={pointerProps.mx} />
        <Box
          onLayout={measureContent}
          backgroundColor="#000"
          borderRadius={4}
          height={adjustedContentSize.height > 0 ? adjustedContentSize.height : undefined}
          width={adjustedContentSize.width > 0 ? adjustedContentSize.width : undefined}
          pt={paddingAggregate.top}
          pb={paddingAggregate.bottom}
          pl={paddingAggregate.left}
          pr={paddingAggregate.right}
        >
          <TouchableWithoutFeedback onPress={onPressContent}>
            <>
              {!!title && <Text style={{ color: "white" }}>{title}</Text>}
              {!!content && <Text style={{ color: "white" }}>{content}</Text>}
            </>
          </TouchableWithoutFeedback>
        </Box>
      </Box>
    )
  }

  useEffect(() => {
    if (isVisible) {
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

const Pointer = ({
  rotate,
  alignSelf,
  mx,
}: {
  rotate: string
  alignSelf: "flex-end" | "flex-start" | "center"
  mx: number | undefined
}) => {
  return (
    <Flex
      width={0}
      height={0}
      backgroundColor="transparent"
      borderStyle="solid"
      alignSelf={alignSelf}
      borderLeftWidth={10}
      borderRightWidth={10}
      borderBottomWidth={12}
      borderLeftColor="transparent"
      borderRightColor="transparent"
      borderBottomColor="black100"
      style={{
        transform: [{ rotate }],
        marginLeft: mx,
        marginRight: mx,
      }}
    />
  )
}

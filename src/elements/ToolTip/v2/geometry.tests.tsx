import { GeometryOutputs, computeToolTipOriginPoint, evaluateForXYAxisOverflow } from "./geometry"

describe("ToolTip geometry", () => {
  const contentSize = { width: 80, height: 40 }
  const safeAreaInsets = { top: 20, bottom: 20, left: 0, right: 0 }
  const windowDimensions = { width: 200, height: 400 }

  describe("origin point computation", () => {
    const centeredAnchor = { x: 80, y: 0, width: 40, height: 40, pageX: 80, pageY: 200 }

    it.each([
      ["top level", true, { x: 60, y: 240 }],
      ["nested", false, { x: 60, y: 52 }],
    ])("should return the expected origin point for a %s anchor", (_, unconstrained, point) => {
      const inputs = {
        anchor: centeredAnchor,
        contentSize,
        toolTipPlacement: "bottom" as const,
        unconstrained,
      }

      const result = computeToolTipOriginPoint(inputs)

      expect(result).toEqual(point)
    })
  })

  describe("manual origin point adjustments", () => {
    const leftAlignedAnchor = { x: 0, y: 0, width: 40, height: 40, pageX: 0, pageY: 200 }
    const rightAlignedAnchor = { x: 160, y: 0, width: 40, height: 40, pageX: 160, pageY: 200 }
    const topAlignedAnchor = { x: 80, y: 0, width: 40, height: 40, pageX: 80, pageY: 0 }
    const bottomAlignedAnchor = { x: 80, y: 360, width: 40, height: 40, pageX: 80, pageY: 360 }

    it.each<[string, boolean, GeometryOutputs]>([
      [
        "top level",
        true,
        {
          pointerProps: { pointerPlacement: "top-left", mx: 20 },
          toolTipOrigin: { x: 5, y: 240 },
          toolTipPlacement: "bottom",
        },
      ],
      [
        "nested",
        false,
        {
          pointerProps: { pointerPlacement: "top-left", mx: 20 },
          toolTipOrigin: { x: 5, y: 52 },
          toolTipPlacement: "bottom",
        },
      ],
    ])(
      "should return the expected outputs for a %s anchor with left overflow",
      (_, unconstrained, output) => {
        const inputs = {
          anchor: leftAlignedAnchor,
          contentSize,
          toolTipPlacement: "bottom" as const,
          unconstrained,
        }
        const toolTipOrigin = computeToolTipOriginPoint(inputs)
        const xEval = evaluateForXYAxisOverflow({
          ...inputs,
          safeAreaInsets,
          toolTipOrigin,
          windowDimensions,
        })

        expect(xEval.pointerProps).toEqual(output.pointerProps)
        expect(xEval.toolTipOrigin).toEqual(output.toolTipOrigin)
        expect(xEval.toolTipPlacement).toEqual(output.toolTipPlacement)
      }
    )

    it.each<[string, boolean, GeometryOutputs]>([
      [
        "top level",
        true,
        {
          pointerProps: { pointerPlacement: "top-right", mx: 20 },
          toolTipOrigin: { x: 115, y: 240 },
          toolTipPlacement: "bottom",
        },
      ],
      [
        "nested",
        false,
        {
          pointerProps: { pointerPlacement: "top-right", mx: 20 },
          toolTipOrigin: { x: 115, y: 52 },
          toolTipPlacement: "bottom",
        },
      ],
    ])(
      "should return the expected outputs for a %s anchor with right overflow",
      (_, unconstrained, output) => {
        const inputs = {
          anchor: rightAlignedAnchor,
          contentSize,
          toolTipPlacement: "bottom" as const,
          unconstrained,
        }
        const toolTipOrigin = computeToolTipOriginPoint(inputs)
        const xEval = evaluateForXYAxisOverflow({
          ...inputs,
          safeAreaInsets,
          toolTipOrigin,
          windowDimensions,
        })

        expect(xEval.pointerProps).toEqual(output.pointerProps)
        expect(xEval.toolTipOrigin).toEqual(output.toolTipOrigin)
        expect(xEval.toolTipPlacement).toEqual(output.toolTipPlacement)
      }
    )

    it.each<[string, boolean, Partial<GeometryOutputs>]>([
      [
        "top level",
        true,
        {
          toolTipPlacement: "top",
        },
      ],
      [
        "nested",
        false,
        {
          toolTipPlacement: "top",
        },
      ],
    ])(
      "should return the adjusted placement for a %s anchor with bottom overflow",
      (_, unconstrained, output) => {
        const inputs = {
          anchor: bottomAlignedAnchor,
          contentSize,
          toolTipPlacement: "bottom" as const,
          unconstrained,
        }
        const toolTipOrigin = computeToolTipOriginPoint(inputs)
        const { toolTipPlacement } = evaluateForXYAxisOverflow({
          ...inputs,
          safeAreaInsets,
          toolTipOrigin,
          windowDimensions,
        })

        expect(toolTipPlacement).toEqual(output.toolTipPlacement)
      }
    )

    it.each<[string, boolean, Partial<GeometryOutputs>]>([
      [
        "top level",
        true,
        {
          toolTipPlacement: "bottom",
        },
      ],
      [
        "nested",
        false,
        {
          toolTipPlacement: "bottom",
        },
      ],
    ])(
      "should return the adjusted placement for a %s anchor with top overflow",
      (_, unconstrained, output) => {
        const inputs = {
          anchor: topAlignedAnchor,
          contentSize,
          toolTipPlacement: "top" as const,
          unconstrained,
        }
        const toolTipOrigin = computeToolTipOriginPoint(inputs)
        const { toolTipPlacement } = evaluateForXYAxisOverflow({
          ...inputs,
          safeAreaInsets,
          toolTipOrigin,
          windowDimensions,
        })

        expect(toolTipPlacement).toEqual(output.toolTipPlacement)
      }
    )
  })
})

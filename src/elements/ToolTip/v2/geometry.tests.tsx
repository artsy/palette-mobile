import { computeToolTipOriginPoint, evaluateForXYAxisOverflow } from "./geometry"

describe("ToolTip geometry", () => {
  const contentSize = { width: 80, height: 40 }
  const safeAreaInsets = { top: 20, bottom: 20, left: 0, right: 0 }
  const windowDimensions = { width: 200, height: 400 }

  describe("origin point computation", () => {
    const centeredAnchor = { x: 80, y: 0, width: 40, height: 40, pageX: 80, pageY: 200 }

    it("should return the expected default origin point for a top level anchor", () => {
      const inputs = {
        anchor: centeredAnchor,
        contentSize,
        toolTipPlacement: "bottom" as const,
        unconstrained: true,
      }

      const result = computeToolTipOriginPoint(inputs)

      expect(result).toEqual({
        x: 60, // anchor x + anchor width / 2 - content width / 2
        y: 240, // anchor pageY + content height
      })
    })

    it("should return the expected default origin point for a nested anchor", () => {
      const inputs = {
        anchor: centeredAnchor,
        contentSize,
        toolTipPlacement: "bottom" as const,
      }

      const result = computeToolTipOriginPoint(inputs)

      expect(result).toEqual({
        x: 60, // anchor x + anchor width / 2 - content width / 2
        y: 52, // anchor y + content height + pointer height
      })
    })
  })

  describe("manual origin adjustments", () => {
    const leftAlignedAnchor = { x: 0, y: 0, width: 40, height: 40, pageX: 0, pageY: 200 }
    const rightAlignedAnchor = { x: 160, y: 0, width: 40, height: 40, pageX: 160, pageY: 200 }

    it("should return the expected outputs for a top level anchor with x coordinate overflow", () => {
      const inputs = {
        anchor: leftAlignedAnchor,
        contentSize,
        toolTipPlacement: "bottom" as const,
        unconstrained: true,
      }

      const xEval = evaluateForXYAxisOverflow({
        ...inputs,
        safeAreaInsets,
        toolTipOrigin: { x: -20, y: 240 },
        windowDimensions,
      })

      expect(xEval.pointerProps).toEqual({ pointerPlacement: "top-left", mx: 20 })
      expect(xEval.toolTipOrigin).toEqual({ x: 5, y: 240 })
      expect(xEval.toolTipPlacement).toEqual("bottom")
    })
  })
})

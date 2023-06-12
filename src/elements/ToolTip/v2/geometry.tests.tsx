import { computeToolTipOriginPoint } from "./geometry"

describe("ToolTip geometry", () => {
  describe("origin point computation", () => {
    it("should return the expected default origin point for a top level anchor", () => {
      const anchor = {
        x: 80,
        y: 0,
        width: 40,
        height: 40,
        pageX: 80,
        pageY: 200,
      }
      const contentSize = {
        width: 80,
        height: 40,
      }
      const padding = undefined
      const unconstrained = true

      const result = computeToolTipOriginPoint(
        anchor,
        contentSize,
        padding,
        "bottom",
        unconstrained
      )

      expect(result).toEqual({
        x: 60,
        y: 240,
      })
    })
  })
})

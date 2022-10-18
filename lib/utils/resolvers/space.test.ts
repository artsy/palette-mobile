import { _test_spacingUnits2, _test_spacingUnits3 } from "../../tokens"
import { space } from "./space"

describe("space resolver", () => {
  it("returns style objects", () => {
    const styles = space({ m: "4px" })
    expect(styles).toEqual({ margin: "4px" })
  })

  it("returns 0 values", () => {
    const styles = space({ m: 0 })
    expect(styles).toEqual({ margin: 0 })
  })

  it("returns negative pixel values", () => {
    const styles = space({ m: -2 })
    expect(styles).toEqual({ margin: -2 })
  })

  it("returns negative em values", () => {
    const styles = space({ m: "-16em" })
    expect(styles).toEqual({ margin: "-16em" })
  })

  it("returns aliased values", () => {
    const styles = space({ px: 2 })
    expect(styles).toEqual({ paddingLeft: 2, paddingRight: 2 })
  })

  it("pl prop sets paddingLeft", () => {
    const styles = space({ pl: 2 })
    expect(styles).toEqual({ paddingLeft: 2 })
  })

  it("pl prop sets paddingLeft 0", () => {
    const styles = space({ pl: 0 })
    expect(styles).toEqual({ paddingLeft: 0 })
  })

  it("px prop overrides pl prop", () => {
    const styles = space({ pl: 1, px: 2 })
    expect(styles).toEqual({ paddingLeft: 2, paddingRight: 2 })
  })

  it("py prop overrides pb prop", () => {
    const styles = space({ pb: 1, py: 2 })
    expect(styles).toEqual({ paddingTop: 2, paddingBottom: 2 })
  })

  it("mx prop overrides mr prop", () => {
    const styles = space({ mr: 1, mx: 2 })
    expect(styles).toEqual({ marginLeft: 2, marginRight: 2 })
  })

  it("my prop overrides mt prop", () => {
    const styles = space({ mt: 1, my: 2 })
    expect(styles).toEqual({ marginTop: 2, marginBottom: 2 })
  })

  it("margin overrides m prop", () => {
    const styles = space({ m: 1, margin: 2 })
    expect(styles).toEqual({ margin: 2 })
  })

  it("handles margin with no theme", () => {
    const styles = space({ mt: 12 })
    expect(styles).toEqual({ marginTop: 12 })
  })

  it("handles overriding margin/padding shortcut props", () => {
    const styles = space({
      m: 4,
      mx: 3,
      mr: 2,
      p: 4,
      py: 3,
      pt: 2,
    })
    expect(styles).toEqual({
      margin: 4,
      marginLeft: 3,
      marginRight: 2,
      padding: 4,
      paddingBottom: 3,
      paddingTop: 2,
    })
  })

  it("single directions override axes", () => {
    const styles = space({
      mx: 3,
      ml: 1,
      mr: 2,
      px: 3,
      pl: 1,
      pr: 2,
    })
    expect(styles).toEqual({
      marginLeft: 1,
      marginRight: 2,
      paddingLeft: 1,
      paddingRight: 2,
    })
  })

  describe("uses palette-tokens values from v2", () => {
    const paletteSpace = (args: any) => space({ theme: { space: _test_spacingUnits2 }, ...args })

    it("uses tokens if they exist as keys 1", () => {
      const styles = paletteSpace({ m: 4 })
      expect(styles).toEqual({ margin: 40 })
    })

    it("uses tokens if they exist as keys 2", () => {
      const styles = paletteSpace({ m: 0.5 })
      expect(styles).toEqual({ margin: 5 })
    })

    it("uses raw number if they don't exist as keys", () => {
      const styles = paletteSpace({ m: 7 })
      expect(styles).toEqual({ margin: 7 })
    })

    describe("negatives", () => {
      it("uses tokens if they exist as string keys 1", () => {
        const styles = paletteSpace({ m: -4 })
        expect(styles).toEqual({ margin: -40 })
      })

      it("uses tokens if they exist as string keys 2", () => {
        const styles = paletteSpace({ m: -0.5 })
        expect(styles).toEqual({ margin: -5 })
      })

      it("uses raw number if they don't exist as keys", () => {
        const styles = paletteSpace({ m: -7 })
        expect(styles).toEqual({ margin: -7 })
      })
    })
  })

  describe("uses palette-tokens values from v3", () => {
    const paletteSpace = (args: any) => space({ theme: { space: _test_spacingUnits3 }, ...args })

    it("uses tokens if they exist as keys 1", () => {
      const styles = paletteSpace({ m: "4" })
      expect(styles).toEqual({ margin: 40 })
    })

    it("uses tokens if they exist as keys 2", () => {
      const styles = paletteSpace({ m: "0.5" })
      expect(styles).toEqual({ margin: 5 })
    })

    it("uses tokens if they exist as string keys 1", () => {
      const styles = paletteSpace({ m: 4 })
      expect(styles).toEqual({ margin: 40 })
    })

    it("uses tokens if they exist as string keys 2", () => {
      const styles = paletteSpace({ m: 0.5 })
      expect(styles).toEqual({ margin: 5 })
    })

    it("uses raw number if they don't exist as keys", () => {
      const styles = paletteSpace({ m: 7 })
      expect(styles).toEqual({ margin: 7 })
    })

    describe("negatives", () => {
      it("uses tokens if they exist as keys 1", () => {
        const styles = paletteSpace({ m: "-4" })
        expect(styles).toEqual({ margin: -40 })
      })

      it("uses tokens if they exist as keys 2", () => {
        const styles = paletteSpace({ m: "-0.5" })
        expect(styles).toEqual({ margin: -5 })
      })

      it("uses tokens if they exist as string keys 1", () => {
        const styles = paletteSpace({ m: -4 })
        expect(styles).toEqual({ margin: -40 })
      })

      it("uses tokens if they exist as string keys 2", () => {
        const styles = paletteSpace({ m: -0.5 })
        expect(styles).toEqual({ margin: -5 })
      })

      it("uses raw number if they don't exist as keys", () => {
        const styles = paletteSpace({ m: -7 })
        expect(styles).toEqual({ margin: -7 })
      })
    })
  })
})

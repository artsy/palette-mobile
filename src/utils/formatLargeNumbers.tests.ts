import { formatLargeNumber } from "./formatLargeNumber"

describe("formatLargeNumber", () => {
  it("should return the same number for numbers less than 1000", () => {
    expect(formatLargeNumber(500)).toBe("500")
  })

  it("should format numbers in thousands correctly", () => {
    expect(formatLargeNumber(1500, 1)).toBe("1.5K")
    expect(formatLargeNumber(1500, 2)).toBe("1.50K")
  })

  it("should format numbers in millions correctly", () => {
    expect(formatLargeNumber(1500000, 1)).toBe("1.5M")
    expect(formatLargeNumber(1500000, 2)).toBe("1.50M")
  })

  it("should format numbers in billions correctly", () => {
    expect(formatLargeNumber(1500000000, 1)).toBe("1.5B")
    expect(formatLargeNumber(1500000000, 2)).toBe("1.50B")
  })
})

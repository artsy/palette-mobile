import { maskValue } from "./maskValue"

const GERMANY_PHONE_MASKS = [
  "999 999",
  "999 9999",
  "999 99999",
  "999 999999",
  "999 9999999",
  "999 99999999",
  "9999 99999999",
]

const TUNISIA_PHONE_MASK = "99 999 999"

const UNITED_STATES_PHONE_MASK = "999 999 9999"

describe(maskValue, () => {
  it("leaves the value value alone if the user is deleting characters", () => {
    expect(
      maskValue({
        currentValue: "017672458053",
        mask: GERMANY_PHONE_MASKS,
      })
    ).toBe("0176 72458053")

    expect(
      maskValue({
        currentValue: "17672458053",
        mask: GERMANY_PHONE_MASKS,
      })
    ).toBe("176 72458053")

    expect(
      maskValue({
        currentValue: "030901820",
        mask: GERMANY_PHONE_MASKS,
      })
    ).toBe("030 901820")

    expect(
      maskValue({
        currentValue: "901820",
        mask: GERMANY_PHONE_MASKS,
      })
    ).toBe("901 820")

    expect(
      maskValue({
        currentValue: "20335902",
        mask: TUNISIA_PHONE_MASK,
      })
    ).toBe("20 335 902")
  })

  it("works with empty strings", () => {
    expect(
      maskValue({
        currentValue: "",
        mask: GERMANY_PHONE_MASKS,
      })
    ).toBe("")

    expect(
      maskValue({
        currentValue: "",
        mask: "",
      })
    ).toBe("")
  })

  it("formats a given phone number to the given country's default format", () => {
    expect(
      maskValue({
        currentValue: "7825577664",
        mask: UNITED_STATES_PHONE_MASK,
      })
    ).toBe("782 557 7664")

    expect(
      maskValue({
        currentValue: "782557766",
        mask: UNITED_STATES_PHONE_MASK,
      })
    ).toBe("782 557 766")
  })
})

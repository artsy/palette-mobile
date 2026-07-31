import { fireEvent, render, screen } from "@testing-library/react-native"
import { StyleSheet } from "react-native"
import { Pill } from "./Pill"
import { Theme } from "../../Theme"

describe("Pill", () => {
  it("invokes the onClick callback", () => {
    const onPress = jest.fn()

    render(
      <Theme>
        <Pill onPress={onPress}>wow</Pill>
      </Theme>
    )

    fireEvent.press(screen.getByText("wow"))
    expect(onPress).toHaveBeenCalled()
  })

  it("should not be pressable if disabled is passed", () => {
    const onPress = jest.fn()

    render(
      <Theme>
        <Pill disabled onPress={onPress}>
          Press me
        </Pill>
      </Theme>
    )

    fireEvent.press(screen.getByText("Press me"))
    expect(onPress).not.toHaveBeenCalled()
  })

  it("switches the onboarding variant's text alignment from center to left once it wraps to multiple lines", () => {
    render(
      <Theme>
        <Pill variant="onboarding">Some label</Pill>
      </Theme>
    )

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).textAlign).toBe("center")

    fireEvent(screen.getByText("Some label"), "textLayout", {
      nativeEvent: { lines: [{}, {}] },
    })

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).textAlign).toBe("left")
  })

  it("leaves other variants' text alignment untouched regardless of line count", () => {
    render(
      <Theme>
        <Pill variant="default">Some label</Pill>
      </Theme>
    )

    fireEvent(screen.getByText("Some label"), "textLayout", {
      nativeEvent: { lines: [{}, {}] },
    })

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).textAlign).toBeUndefined()
  })
})

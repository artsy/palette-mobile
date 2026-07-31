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

  it("left-aligns the option variant's text", () => {
    render(
      <Theme>
        <Pill variant="option">Some label</Pill>
      </Theme>
    )

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).textAlign).toBe("left")
  })

  it("leaves other variants' text alignment untouched, including onboarding", () => {
    render(
      <Theme>
        <>
          <Pill variant="default">Some label</Pill>
          <Pill variant="onboarding">Some other label</Pill>
        </>
      </Theme>
    )

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).textAlign).toBeUndefined()
    expect(
      StyleSheet.flatten(screen.getByText("Some other label").props.style).textAlign
    ).toBeUndefined()
  })

  it("uses the default per-state color when no color override is passed", () => {
    render(
      <Theme>
        <Pill variant="option">Some label</Pill>
      </Theme>
    )

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).color).toBe("#000000")
  })

  it("lets a color override win over the default per-state color", () => {
    render(
      <Theme>
        <Pill variant="option" color="mono0">
          Some label
        </Pill>
      </Theme>
    )

    expect(StyleSheet.flatten(screen.getByText("Some label").props.style).color).toBe("#FFFFFF")
  })
})

import { fireEvent, render, screen } from "@testing-library/react-native"
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
})

import { fireEvent, render } from "@testing-library/react-native"
import { Pill } from "./Pill"
import { Theme } from "../../Theme"

describe("Pill", () => {
  it("invokes the onClick callback", () => {
    const onPress = jest.fn()

    const { getByText } = render(
      <Theme>
        <Pill onPress={onPress}>wow</Pill>
      </Theme>
    )

    fireEvent.press(getByText("wow"))
    expect(onPress).toHaveBeenCalled()
  })

  it("should not be pressable if disabled is passed", () => {
    const onPress = jest.fn()

    const { getByText } = render(
      <Theme>
        <Pill disabled onPress={onPress}>
          Press me
        </Pill>
      </Theme>
    )

    fireEvent.press(getByText("Press me"))
    expect(onPress).not.toHaveBeenCalled()
  })
})

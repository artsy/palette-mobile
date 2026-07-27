import { fireEvent, screen } from "@testing-library/react-native"
import { Button } from "./Button"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"
import { Spinner } from "../Spinner"

describe("Button", () => {
  it("shows spinner if loading is true", () => {
    const { UNSAFE_queryAllByType } = renderWithWrappers(<Button loading>wow</Button>)
    expect(UNSAFE_queryAllByType(Spinner)).toHaveLength(1)
  })

  it("invokes the onClick callback", () => {
    const onPress = jest.fn()

    renderWithWrappers(
      <Button testID="the-button" onPress={onPress}>
        wow
      </Button>
    )

    fireEvent.press(screen.getByTestId("the-button"))

    expect(onPress).toHaveBeenCalled()
  })

  it("does not invoke the onClick callback if loading is true", () => {
    const onPress = jest.fn()

    renderWithWrappers(
      <Button testID="the-button" onPress={onPress} loading>
        wow
      </Button>
    )

    fireEvent.press(screen.getByTestId("the-button"))

    expect(onPress).not.toHaveBeenCalled()
  })

  it("does not invoke the onClick callback if disabled is true", () => {
    const onPress = jest.fn()

    renderWithWrappers(
      <Button testID="the-button" onPress={onPress} disabled>
        wow
      </Button>
    )

    fireEvent.press(screen.getByTestId("the-button"))

    expect(onPress).not.toHaveBeenCalled()
  })
})

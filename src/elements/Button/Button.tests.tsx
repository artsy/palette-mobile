import { fireEvent } from "@testing-library/react-native"
import { Button } from "."
import { Spinner } from ".."
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Button", () => {
  it("shows spinner if loading is true", () => {
    const { UNSAFE_queryAllByType } = renderWithWrappers(<Button loading>wow</Button>)
    expect(UNSAFE_queryAllByType(Spinner)).toHaveLength(1)
  })

  it("invokes the onClick callback", () => {
    const onPress = jest.fn()

    const { getByTestId } = renderWithWrappers(
      <Button testID="the-button" onPress={onPress}>
        wow
      </Button>
    )

    fireEvent.press(getByTestId("the-button"))

    expect(onPress).toHaveBeenCalled()
  })

  it("does not invoke the onClick callback if loading is true", () => {
    const onPress = jest.fn()

    const { getByTestId } = renderWithWrappers(
      <Button testID="the-button" onPress={onPress} loading>
        wow
      </Button>
    )

    fireEvent.press(getByTestId("the-button"))

    expect(onPress).not.toHaveBeenCalled()
  })

  it("does not invoke the onClick callback if disabled is true", () => {
    const onPress = jest.fn()

    const { getByTestId } = renderWithWrappers(
      <Button testID="the-button" onPress={onPress} disabled>
        wow
      </Button>
    )

    fireEvent.press(getByTestId("the-button"))

    expect(onPress).not.toHaveBeenCalled()
  })
})

import { fireEvent, screen } from "@testing-library/react-native"
import { Button } from "./Button"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Button", () => {
  it("marks the button as busy if loading is true", async () => {
    await renderWithWrappers(<Button loading>wow</Button>)

    expect(screen.getByRole("button")).toBeBusy()
  })

  it("does not mark the button as busy if loading is false", async () => {
    await renderWithWrappers(<Button>wow</Button>)

    expect(screen.getByRole("button")).not.toBeBusy()
  })

  it("invokes the onClick callback", async () => {
    const onPress = jest.fn()

    await renderWithWrappers(
      <Button testID="the-button" onPress={onPress}>
        wow
      </Button>
    )

    await fireEvent.press(screen.getByTestId("the-button"))

    expect(onPress).toHaveBeenCalled()
  })

  it("does not invoke the onClick callback if loading is true", async () => {
    const onPress = jest.fn()

    await renderWithWrappers(
      <Button testID="the-button" onPress={onPress} loading>
        wow
      </Button>
    )

    await fireEvent.press(screen.getByTestId("the-button"))

    expect(onPress).not.toHaveBeenCalled()
  })

  it("does not invoke the onClick callback if disabled is true", async () => {
    const onPress = jest.fn()

    await renderWithWrappers(
      <Button testID="the-button" onPress={onPress} disabled>
        wow
      </Button>
    )

    await fireEvent.press(screen.getByTestId("the-button"))

    expect(onPress).not.toHaveBeenCalled()
  })
})

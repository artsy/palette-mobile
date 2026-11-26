import { fireEvent, screen } from "@testing-library/react-native"
import { Input } from "./Input"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Input", () => {
  const testID = "input"

  it("renders an instance of native TextInput", async () => {
    await renderWithWrappers(<Input testID={testID} />)

    expect(screen.getByTestId(testID).type).toEqual("TextInput")
  })

  it("uses correct font family", async () => {
    await renderWithWrappers(<Input testID={testID} placeholder="input" />)

    expect(screen.getByPlaceholderText("input").props.style[0].fontFamily).toEqual(
      "Unica77LL-Regular"
    )
  })

  it("mutates given text as value", async () => {
    await renderWithWrappers(<Input testID={testID} />)

    await fireEvent.changeText(screen.getByTestId(testID), "mockStr")

    screen.getByDisplayValue("mockStr")
  })

  it("Shows an error message when input has an error", async () => {
    await renderWithWrappers(<Input value="" error="input has an error" />)

    screen.getByText("input has an error")
  })

  it("should render the clear button when input is not empty and pressing it should clear the input", async () => {
    const onChangeText = jest.fn()
    const onClear = jest.fn()

    await renderWithWrappers(
      <Input
        testID={testID}
        placeholder="USD"
        enableClearButton
        onChangeText={onChangeText}
        onClear={onClear}
      />
    )

    expect(screen.queryByLabelText("Clear")).not.toBeOnTheScreen()

    await fireEvent.changeText(screen.getByTestId(testID), "Banksy")

    await fireEvent.press(screen.getByLabelText("Clear"))

    // The native text is cleared through the TextInput ref, which Jest can't run, so assert on
    // what the component does with it: the value is reset and the clear button goes away.
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(onChangeText).toHaveBeenLastCalledWith("")
    expect(screen.queryByLabelText("Clear")).not.toBeOnTheScreen()
  })

  it("should show the correct show/hide password icon", async () => {
    await renderWithWrappers(<Input placeholder="password" secureTextEntry />)

    screen.getByPlaceholderText("password")

    screen.getByLabelText("show password icon")

    await fireEvent(screen.getByPlaceholderText("password"), "onChangeText", "123456")

    await fireEvent.press(screen.getByLabelText("show password icon"))

    expect(screen.queryByLabelText("show password icon")).toBeFalsy()
    screen.getByLabelText("hide password icon")

    await fireEvent.press(screen.getByLabelText("hide password icon"))

    expect(screen.queryByLabelText("hide password icon")).toBeFalsy()
    screen.getByLabelText("show password icon")
  })

  it("enables scrolling when multiline is true", async () => {
    await renderWithWrappers(<Input testID={testID} multiline />)

    expect(screen.getByTestId(testID).props.scrollEnabled).toBe(true)
  })
})

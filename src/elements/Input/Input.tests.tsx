import { act, fireEvent, screen } from "@testing-library/react-native"
import { Input } from "./Input"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Input", () => {
  const testID = "input"

  it("renders an instance of native TextInput", () => {
    renderWithWrappers(<Input testID={testID} />)

    expect(screen.getByTestId(testID).type).toEqual("TextInput")
  })

  it("uses correct font family", () => {
    renderWithWrappers(<Input testID={testID} placeholder="input" />)

    expect(screen.getByPlaceholderText("input")).toHaveStyle({ fontFamily: "Unica77LL-Regular" })
  })

  it("mutates given text as value", () => {
    renderWithWrappers(<Input testID={testID} />)

    fireEvent.changeText(screen.getByTestId(testID), "mockStr")

    screen.getByDisplayValue("mockStr")
  })

  it("Shows an error message when input has an error", () => {
    renderWithWrappers(<Input value="" error="input has an error" />)

    screen.getByText("input has an error")
  })

  it("should render the clear button when input is not empty and pressing it should clear the input", async () => {
    renderWithWrappers(<Input testID={testID} placeholder="USD" enableClearButton />)

    fireEvent(screen.getByTestId(testID), "onChangeText", "Banksy")

    await screen.findByLabelText("Clear input button")

    fireEvent.press(screen.getByLabelText("Clear input button"))

    expect(screen.queryByDisplayValue("Banksy")).toBeFalsy()
  })

  it("should show the correct show/hide password icon", () => {
    renderWithWrappers(<Input placeholder="password" secureTextEntry />)

    screen.getByPlaceholderText("password")

    screen.getByLabelText("show password button")

    fireEvent(screen.getByPlaceholderText("password"), "onChangeText", "123456")

    fireEvent.press(screen.getByLabelText("show password button"))

    expect(screen.queryByLabelText("show password button")).toBeFalsy()
    screen.getByLabelText("hide password button")

    fireEvent.press(screen.getByLabelText("hide password button"))

    expect(screen.queryByLabelText("hide password button")).toBeFalsy()
    screen.getByLabelText("show password button")
  })

  it("enables scrolling when multiline is true", () => {
    renderWithWrappers(<Input testID={testID} multiline />)

    expect(screen.getByTestId(testID).props.scrollEnabled).toBe(true)
  })
})

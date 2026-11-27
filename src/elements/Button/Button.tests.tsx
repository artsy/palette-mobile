import { screen } from "@testing-library/react-native"
import { processColor, StyleSheet } from "react-native"
import { Button } from "./Button"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Button", () => {
  const getColors = () => {
    const container = screen
      .getByTestId("the-button")
      .findAll(
        (node) =>
          typeof node.type === "string" && !!StyleSheet.flatten(node.props.style)?.borderColor
      )[0]
    const containerStyle = StyleSheet.flatten(container.props.style)
    const textStyle = StyleSheet.flatten(screen.getByText("Continue").props.style)

    return {
      background: processColor(containerStyle.backgroundColor),
      border: processColor(containerStyle.borderColor),
      text: processColor(textStyle.color),
    }
  }

  const disabledColors = {
    background: processColor("#C2C2C2"),
    border: processColor("#C2C2C2"),
    text: processColor("white"),
  }

  const enabledColors = {
    background: processColor("#000000"),
    border: processColor("#000000"),
    text: processColor("#FFFFFF"),
  }

  it("updates its colours when disabled changes after mount", () => {
    const { rerender } = renderWithWrappers(
      <Button testID="the-button" disabled>
        Continue
      </Button>
    )
    expect(getColors()).toEqual(disabledColors)

    rerender(<Button testID="the-button">Continue</Button>)
    expect(getColors()).toEqual(enabledColors)

    rerender(
      <Button testID="the-button" disabled>
        Continue
      </Button>
    )
    expect(getColors()).toEqual(disabledColors)
  })
})

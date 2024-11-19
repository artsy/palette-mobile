import { fireEvent, screen } from "@testing-library/react-native"
import { Message } from "./Message"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Message", () => {
  it("it renders", () => {
    renderWithWrappers(<Message variant="default" title="title" text="text" />)

    expect(screen.getByText("title")).toBeOnTheScreen()
    expect(screen.getByText("text")).toBeOnTheScreen()
  })

  it("does not show close button when !showCloseButton", () => {
    renderWithWrappers(<Message variant="default" title="title" text="text" />)

    expect(screen.queryByTestId("Message-close-button")).not.toBeOnTheScreen()
  })

  it("shows close button when showCloseButton", () => {
    renderWithWrappers(<Message variant="default" title="title" text="text" showCloseButton />)

    expect(screen.getByTestId("Message-close-button")).toBeOnTheScreen()
  })

  it("fires onClose press event", () => {
    const onClose = jest.fn()
    renderWithWrappers(
      <Message variant="default" onClose={onClose} title="title" text="text" showCloseButton />
    )

    fireEvent.press(screen.getByTestId("Message-close-button"))

    expect(onClose).toHaveBeenCalled()
  })
})

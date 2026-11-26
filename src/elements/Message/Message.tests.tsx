import { fireEvent, screen } from "@testing-library/react-native"
import { Message } from "./Message"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Message", () => {
  it("it renders", async () => {
    await renderWithWrappers(<Message variant="default" title="title" text="text" />)

    expect(screen.getByText("title")).toBeOnTheScreen()
    expect(screen.getByText("text")).toBeOnTheScreen()
  })

  it("does not show close button when !showCloseButton", async () => {
    await renderWithWrappers(<Message variant="default" title="title" text="text" />)

    expect(screen.queryByTestId("Message-close-button")).not.toBeOnTheScreen()
  })

  it("shows close button when showCloseButton", async () => {
    await renderWithWrappers(
      <Message variant="default" title="title" text="text" showCloseButton />
    )

    expect(screen.getByTestId("Message-close-button")).toBeOnTheScreen()
  })

  it("fires onClose press event", async () => {
    const onClose = jest.fn()
    await renderWithWrappers(
      <Message variant="default" onClose={onClose} title="title" text="text" showCloseButton />
    )

    await fireEvent.press(screen.getByTestId("Message-close-button"))

    expect(onClose).toHaveBeenCalled()
  })

  it("shows icon component when IconComponent left", async () => {
    await renderWithWrappers(
      <Message
        variant="default"
        title="title"
        text="text"
        showCloseButton
        IconComponent={() => <></>}
      />
    )

    expect(screen.getByTestId("icon-component-left")).toBeOnTheScreen()
  })

  it("shows icon component when IconComponent right", async () => {
    await renderWithWrappers(
      <Message
        iconPosition="right"
        variant="default"
        title="title"
        text="text"
        showCloseButton
        IconComponent={() => <></>}
      />
    )

    expect(screen.getByTestId("icon-component-right")).toBeOnTheScreen()
  })

  it("shows icon component when IconComponent bottom", async () => {
    await renderWithWrappers(
      <Message
        iconPosition="bottom"
        variant="default"
        title="title"
        text="text"
        showCloseButton
        IconComponent={() => <></>}
      />
    )

    expect(screen.getByTestId("icon-component-bottom")).toBeOnTheScreen()
  })

  it("does not show icon component when !IconComponent ", async () => {
    await renderWithWrappers(
      <Message variant="default" title="title" text="text" showCloseButton />
    )

    expect(screen.queryByTestId("icon-component-left")).not.toBeOnTheScreen()
    expect(screen.queryByTestId("icon-component-right")).not.toBeOnTheScreen()
    expect(screen.queryByTestId("icon-component-bottom")).not.toBeOnTheScreen()
  })
})

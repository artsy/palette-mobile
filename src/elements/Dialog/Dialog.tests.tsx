import { fireEvent, screen } from "@testing-library/react-native"
import { Dialog } from "./Dialog"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Dialog", () => {
  it("renders without error", () => {
    renderWithWrappers(
      <Dialog
        title="title"
        isVisible
        primaryCta={{
          text: "Primary Action Button",
          onPress: jest.fn(),
        }}
      />
    )

    expect(screen.getByText("title")).toBeOnTheScreen()
  })

  it("should render details if it is passed", () => {
    renderWithWrappers(
      <Dialog
        title="title"
        detail="Some unique detail"
        isVisible
        primaryCta={{
          text: "Primary Action Button",
          onPress: jest.fn(),
        }}
      />
    )

    expect(screen.getByText("Some unique detail")).toBeOnTheScreen()
  })

  it("should render the primary action button", () => {
    const primaryActionMock = jest.fn()

    renderWithWrappers(
      <Dialog
        title="title"
        isVisible
        primaryCta={{
          text: "Primary Action Button",
          onPress: primaryActionMock,
        }}
      />
    )
    const primaryButton = screen.getByTestId("dialog-primary-action-button")

    fireEvent.press(primaryButton)

    expect(primaryActionMock).toHaveBeenCalled()
    expect(screen.getByText("Primary Action Button")).toBeOnTheScreen()
  })

  it("should render the secondary action button if it is passed", () => {
    const secondaryActionMock = jest.fn()

    renderWithWrappers(
      <Dialog
        title="title"
        isVisible
        primaryCta={{
          text: "Primary Action Button",
          onPress: jest.fn(),
        }}
        secondaryCta={{
          text: "Secondary Action Button",
          onPress: secondaryActionMock,
        }}
      />
    )
    const secondaryButton = screen.getByTestId("dialog-secondary-action-button")

    fireEvent.press(secondaryButton)

    expect(secondaryActionMock).toHaveBeenCalled()
    expect(screen.getByText("Secondary Action Button")).toBeOnTheScreen()
  })

  it("should call onBackgroundPress when backdrop is pressed", () => {
    const onBackgroundPressMock = jest.fn()
    renderWithWrappers(
      <Dialog
        title="title"
        isVisible
        onBackgroundPress={onBackgroundPressMock}
        primaryCta={{
          text: "Primary Action Button",
          onPress: jest.fn(),
        }}
      />
    )

    fireEvent.press(screen.getByTestId("dialog-backdrop"))

    expect(onBackgroundPressMock).toHaveBeenCalled()
  })
})

import { fireEvent } from "@testing-library/react-native"
import { Dialog } from "./Dialog"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Dialog", () => {
  it("renders without error", () => {
    const { getByText } = renderWithWrappers(
      <Dialog
        title="title"
        isVisible
        primaryCta={{
          text: "Primary Action Button",
          onPress: jest.fn(),
        }}
      />
    )

    expect(getByText("title")).toBeTruthy()
  })

  it("should render details if it is passed", () => {
    const { getByText } = renderWithWrappers(
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

    expect(getByText("Some unique detail")).toBeTruthy()
  })

  it("should render the primary action button", () => {
    const primaryActionMock = jest.fn()

    const { getByTestId, getByText } = renderWithWrappers(
      <Dialog
        title="title"
        isVisible
        primaryCta={{
          text: "Primary Action Button",
          onPress: primaryActionMock,
        }}
      />
    )
    const primaryButton = getByTestId("dialog-primary-action-button")

    fireEvent.press(primaryButton)

    expect(primaryActionMock).toHaveBeenCalled()
    expect(getByText("Primary Action Button")).toBeTruthy()
  })

  it("should render the secondary action button if it is passed", () => {
    const secondaryActionMock = jest.fn()

    const { getByTestId, getByText } = renderWithWrappers(
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
    const secondaryButton = getByTestId("dialog-secondary-action-button")

    fireEvent.press(secondaryButton)

    expect(secondaryActionMock).toHaveBeenCalled()
    expect(getByText("Secondary Action Button")).toBeTruthy()
  })

  it("should call onBackgroundPress when backdrop is pressed", () => {
    const onBackgroundPressMock = jest.fn()
    const { getByTestId } = renderWithWrappers(
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

    fireEvent.press(getByTestId("dialog-backdrop"))

    expect(onBackgroundPressMock).toHaveBeenCalled()
  })
})

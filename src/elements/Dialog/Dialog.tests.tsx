import { fireEvent, screen, act } from "@testing-library/react-native"
import { Dialog } from "./Dialog"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Dialog", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("renders without error", async () => {
    await renderWithWrappers(
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

  it("should render details if it is passed", async () => {
    await renderWithWrappers(
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

  it("should render the primary action button", async () => {
    const primaryActionMock = jest.fn()

    await renderWithWrappers(
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

    await fireEvent.press(primaryButton)
    await act(() => {
      jest.runAllTimers()
    })

    expect(primaryActionMock).toHaveBeenCalled()
    expect(screen.getByText("Primary Action Button")).toBeOnTheScreen()
  })

  it("should render the secondary action button if it is passed", async () => {
    const secondaryActionMock = jest.fn()

    await renderWithWrappers(
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

    await fireEvent.press(secondaryButton)
    await act(() => {
      jest.runAllTimers()
    })

    expect(secondaryActionMock).toHaveBeenCalled()
    expect(screen.getByText("Secondary Action Button")).toBeOnTheScreen()
  })

  it("should call onBackgroundPress when backdrop is pressed", async () => {
    const onBackgroundPressMock = jest.fn()
    await renderWithWrappers(
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

    await fireEvent.press(screen.getByTestId("dialog-backdrop"))
    await act(() => {
      jest.runAllTimers()
    })

    expect(onBackgroundPressMock).toHaveBeenCalled()
  })
})

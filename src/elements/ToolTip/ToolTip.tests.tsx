import { screen } from "@testing-library/react-native"
import { ToolTip } from "./ToolTip"
import { ScreenDimensionsProvider } from "../../utils/hooks"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"
import { Text } from "../Text"

describe("ToolTip", () => {
  it("shows the flyout when enabled", async () => {
    await renderWithWrappers(
      <ScreenDimensionsProvider>
        <ToolTip enabled testID="flyout" initialToolTipText="Words">
          <Text>Text</Text>
        </ToolTip>
      </ScreenDimensionsProvider>
    )
    expect(screen.getByTestId("flyout")).toBeOnTheScreen()
  })
  it("Does not show the flyout when disabled", async () => {
    await renderWithWrappers(
      <ScreenDimensionsProvider>
        <ToolTip enabled={false} testID="flyout" initialToolTipText="Words">
          <Text>Text</Text>
        </ToolTip>
      </ScreenDimensionsProvider>
    )
    expect(screen.queryByTestId("flyout")).not.toBeOnTheScreen()
  })
})

import { ToolTip } from "./ToolTip"
import { ScreenDimensionsProvider } from "../../utils/hooks"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"
import { Text } from "../Text"

describe("ToolTip", () => {
  it("shows the flyout when enabled", () => {
    const { queryByTestId } = renderWithWrappers(
      <ScreenDimensionsProvider>
        <ToolTip enabled testID="flyout" initialToolTipText="Words">
          <Text>Text</Text>
        </ToolTip>
      </ScreenDimensionsProvider>
    )
    expect(queryByTestId("flyout")).not.toBeNull()
  })
  it("Does not show the flyout when disabled", () => {
    const { queryByTestId } = renderWithWrappers(
      <ScreenDimensionsProvider>
        <ToolTip enabled={false} testID="flyout" initialToolTipText="Words">
          <Text>Text</Text>
        </ToolTip>
      </ScreenDimensionsProvider>
    )
    expect(queryByTestId("flyout")).toBeNull()
  })
})

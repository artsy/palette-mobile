import { ToolTip } from "./ToolTip"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"
import { Text } from "../Text"

describe("ToolTip", () => {
  it("shows the flyout when enabled", () => {
    const { queryByTestId } = renderWithWrappers(
      <ToolTip enabled testID="flyout" initialToolTipText="Words">
        <Text>Text</Text>
      </ToolTip>
    )
    expect(queryByTestId("flyout")).not.toBeNull()
  })
  it("Does not show the flyout when disabled", () => {
    const { queryByTestId } = renderWithWrappers(
      <ToolTip enabled={false} testID="flyout" initialToolTipText="Words">
        <Text>Text</Text>
      </ToolTip>
    )
    expect(queryByTestId("flyout")).toBeNull()
  })
})

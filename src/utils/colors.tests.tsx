import { screen } from "@testing-library/react-native"
import { View } from "react-native"
import { useColor } from "./hooks"
import { renderWithWrappers } from "./tests/renderWithWrappers"
import { _test_THEMES } from "../Theme"
import { Color } from "../types"

describe("color", () => {
  const ColorView = ({ name }: { name: Color }) => {
    const color = useColor()
    return <View style={{ backgroundColor: color(name) }} />
  }

  it("returns the correct color with a Theme provider", () => {
    const TestComponent = () => <ColorView name="black10" />

    const { UNSAFE_getByType } = renderWithWrappers(<TestComponent />)
    expect(UNSAFE_getByType(View).props.style.backgroundColor).toBe(_test_THEMES.v3.colors.black10)
  })
})

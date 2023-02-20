import { View } from "react-native"
import { useSpace } from "./hooks"
import { renderWithWrappers } from "./tests/renderWithWrappers"
import { SpacingUnitDSValueNumber } from "../types"

describe("space", () => {
  const SpaceView = ({ name }: { name: SpacingUnitDSValueNumber }) => {
    const space = useSpace()
    return <View style={{ marginLeft: space(name) }} />
  }

  it("returns the correct space with a Theme provider", () => {
    const TestComponent = () => <SpaceView name={1} />

    const { UNSAFE_getByType } = renderWithWrappers(<TestComponent />)
    expect(UNSAFE_getByType(View).props.style.marginLeft).toBe(10)
  })

  it("returns the correct space with a Theme provider", () => {
    const TestComponent = () => (
      <>
        <SpaceView name={0.5} />
        <SpaceView name={2} />
      </>
    )
    const { UNSAFE_getAllByType } = renderWithWrappers(<TestComponent />)
    const margins = UNSAFE_getAllByType(View).map((view: any) => view.props.style.marginLeft)
    expect(margins[0]).toBe(5)
    expect(margins[1]).toBe(20)
  })
})

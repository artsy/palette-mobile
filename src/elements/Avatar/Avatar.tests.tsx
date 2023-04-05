import { screen } from "@testing-library/react-native"
import { Image } from "react-native"
import { Avatar } from "./Avatar"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Avatar", () => {
  it("renders initials if no image url and initials provided", () => {
    renderWithWrappers(<Avatar initials="AB" />)

    expect(screen.UNSAFE_queryByType(Image)).not.toBeTruthy()
    expect(screen.getByText("AB")).toBeTruthy()
  })
})

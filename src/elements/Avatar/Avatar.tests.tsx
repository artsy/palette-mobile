import { screen } from "@testing-library/react-native"
import { Avatar } from "./Avatar"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("Avatar", () => {
  it("renders initials if no image url and initials provided", async () => {
    await renderWithWrappers(<Avatar initials="AB" />)

    expect(screen.queryByLabelText("AvatarImage")).not.toBeOnTheScreen()
    expect(screen.getByText("AB")).toBeOnTheScreen()
  })
})

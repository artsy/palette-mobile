import { waitFor } from "@testing-library/react-native"
import { ProgressBar, ProgressBarProps } from "./ProgressBar"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("ProgressBar", () => {
  const getWrapper = (props: ProgressBarProps) => {
    return renderWithWrappers(<ProgressBar {...props} />)
  }

  it.skip("does not display the track view when progress is zero", async () => {
    const wrapper = getWrapper({ progress: 0 })
    const container = wrapper.getByTestId("progress-bar")
    const track = wrapper.getByTestId("progress-bar-track")

    expect(container.props.width).toEqual("100%")
    // width of 0% is invisible
    await waitFor(() => expect(track.props.style.width).toEqual("0%"))
  })

  it.skip("display the track view when progress is above zero", async () => {
    const wrapper = getWrapper({ progress: 50 })
    const container = wrapper.getByTestId("progress-bar")
    const track = wrapper.getByTestId("progress-bar-track")

    expect(container.props.width).toEqual("100%")
    // width of 50% is visible
    // wait for animations to finish running
    await waitFor(() => expect(track.props.style.width).toEqual("50%"))
  })
})

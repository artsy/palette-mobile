import { screen } from "@testing-library/react-native"
import { ProgressBar } from "./ProgressBar"
import { renderWithWrappers } from "../../utils/tests/renderWithWrappers"

describe("ProgressBar", () => {
  it("renders the progress bar track", () => {
    renderWithWrappers(<ProgressBar progress={50} />)

    expect(screen.getByTestId("progress-bar-track")).toBeOnTheScreen()
  })

  it("applies the given height to the track", () => {
    renderWithWrappers(<ProgressBar progress={50} height={10} />)

    expect(screen.getByTestId("progress-bar-track")).toHaveStyle({ height: 10 })
  })

  it("applies custom progressBarStyle to the track", () => {
    renderWithWrappers(<ProgressBar progress={50} progressBarStyle={{ borderRadius: 4 }} />)

    expect(screen.getByTestId("progress-bar-track")).toHaveStyle({ borderRadius: 4 })
  })

  describe("onCompletion", () => {
    it("is not called when progress is below 100", () => {
      const onCompletion = jest.fn()

      renderWithWrappers(<ProgressBar progress={99} onCompletion={onCompletion} />)

      expect(onCompletion).not.toHaveBeenCalled()
    })

    it("is called when progress reaches 100", () => {
      const onCompletion = jest.fn()

      renderWithWrappers(<ProgressBar progress={100} onCompletion={onCompletion} />)

      expect(onCompletion).toHaveBeenCalledTimes(1)
    })

    it("is called when progress exceeds 100, since progress is clamped", () => {
      const onCompletion = jest.fn()

      renderWithWrappers(<ProgressBar progress={150} onCompletion={onCompletion} />)

      expect(onCompletion).toHaveBeenCalledTimes(1)
    })

    it("is called when progress updates to 100", () => {
      const onCompletion = jest.fn()

      const { rerender } = renderWithWrappers(
        <ProgressBar progress={50} onCompletion={onCompletion} />
      )
      expect(onCompletion).not.toHaveBeenCalled()

      rerender(<ProgressBar progress={100} onCompletion={onCompletion} />)

      expect(onCompletion).toHaveBeenCalledTimes(1)
    })

    it("is only called once even if progress changes again", () => {
      const onCompletion = jest.fn()

      const { rerender } = renderWithWrappers(
        <ProgressBar progress={100} onCompletion={onCompletion} />
      )
      rerender(<ProgressBar progress={50} onCompletion={onCompletion} />)
      rerender(<ProgressBar progress={100} onCompletion={onCompletion} />)

      expect(onCompletion).toHaveBeenCalledTimes(1)
    })
  })
})

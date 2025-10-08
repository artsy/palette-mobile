import { PixelRatio } from "react-native"
import {
  createGeminiUrl,
  GeminiResizeMode,
  imageAlreadyResized,
} from "../../../utils/createGeminiUrl"

/**
 * This method retuns a valid image url to be used within an Image Component
 * It handles the case of resizing the image on the fly using Gemini
 */
export const getImageURL = ({
  src,
  dimensions,
  geminiResizeMode,
  performResize,
}: {
  src: string
  dimensions: { width: number; height: number }
  geminiResizeMode: GeminiResizeMode
  performResize: boolean
}) => {
  let uri = src

  if (performResize) {
    if (!imageAlreadyResized(src)) {
      uri = createGeminiUrl({
        imageURL: src,
        width: PixelRatio.getPixelSizeForLayoutSize(dimensions.width),
        height: PixelRatio.getPixelSizeForLayoutSize(dimensions.height),
        resizeMode: geminiResizeMode,
      })
    } else {
      if (__DEV__) {
        console.warn(
          "You are resizing a gemini url that is already resized. Pass performResize={false} or do not use a resized url"
        )
      }
    }
  }

  return uri
}

import { Platform } from "react-native"

export type GeminiResizeMode = "fit" | "fill"

export function createGeminiUrl({
  imageURL,
  width,
  height,
  geminiHost = "d7hftxdivxxvm.cloudfront.net",
  imageQuality = 80,
  resizeMode = "fit",
}: {
  imageURL: string
  width: number
  height: number
  geminiHost?: string
  imageQuality?: number
  resizeMode?: GeminiResizeMode
}) {
  const src = encodeURIComponent(imageURL)

  const roundedHeight = Math.round(height)
  const roundedWidth = Math.round(width)

  const params = [
    `height=${roundedHeight}`,
    `quality=${imageQuality}`,
    `resize_to=${resizeMode}`,
    `src=${src}`,
    `width=${roundedWidth}`,
  ]

  if (Platform.OS === "android" || (Platform.OS === "ios" && osMajorVersion() >= 14)) {
    params.push("convert_to=webp")
  }

  return `https://${geminiHost}/?${params.join("&")}`
}

const osMajorVersion = () => {
  // eslint-disable-next-line no-constant-condition
  if (typeof (Platform.Version === "string")) {
    return parseInt(Platform.Version as string, 10)
  } else {
    return Platform.Version as number
  }
}

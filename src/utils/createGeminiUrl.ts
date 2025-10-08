import { Platform } from "react-native"

export type GeminiResizeMode = "fit" | "fill"

const geminiHosts = [
  "https://d7hftxdivxxvm.cloudfront.net",
  "https://d196wkiy8qx2u5.cloudfront.net",
]

export const imageAlreadyResized = (imageURL: string) => {
  return geminiHosts.some((host) => imageURL.includes(host))
}

export function createGeminiUrl({
  imageURL,
  width,
  height,
  geminiHost = "d7hftxdivxxvm.cloudfront.net",
  imageQuality = 80,
  resizeMode = "fill",
}: {
  imageURL: string
  width: number
  height: number
  geminiHost?: string
  imageQuality?: number
  resizeMode?: GeminiResizeMode
}) {
  if (imageAlreadyResized(imageURL)) {
    console.error(
      "Image: `performResize` on self referential url. Avoid resizing gemini urls. Pass performResize={false} to fix this.",
      { imageURL }
    )
  }

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

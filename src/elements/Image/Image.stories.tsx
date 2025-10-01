import { Image } from "./Image"
import { Flex } from "../Flex"

export default {
  title: "Image",
}

export const WithDefaultFallbackScreenWidth = () => (
  <Image
    aspectRatio={0.62}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithDefaultFallbackScreenWidth.story = {
  name: "With default fallback screen width",
}

export const WithWidthAndHeight = () => (
  <Image
    width={250}
    height={400}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithWidthAndHeight.story = {
  name: "With width and height",
}

export const WithAspectRatio = () => (
  <Image
    width={250}
    aspectRatio={0.62}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithAspectRatio.story = {
  name: "With aspect ratio",
}

export const WithoutAutomaticResizing = () => (
  <Image
    aspectRatio={0.62}
    performResize={false}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithoutAutomaticResizing.story = {
  name: "Without automatic resizing",
}

export const WithPercentageWidthAndHeight = () => {
  return (
    <Flex flexDirection="row" flex={1}>
      <Flex flex={1} style={{ aspectRatio: 0.69 }}>
        <Image
          src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
          height={260}
          width={180}
          style={{ width: "100%", height: "100%" }}
        />
      </Flex>

      <Flex flex={1} style={{ aspectRatio: 1 }}>
        <Image
          src="https://i.imgur.com/b9IZinu.gif"
          width={200}
          height={200}
          style={{ width: "100%", height: "100%" }}
        />
      </Flex>

      <Flex flex={1} style={{ aspectRatio: 1.2 }}>
        <Image
          width={200}
          height={240}
          src="https://i.imgur.com/non-existing-image.gif"
          style={{ width: "100%", height: "100%" }}
        />
      </Flex>
    </Flex>
  )
}

WithPercentageWidthAndHeight.story = {
  name: "With percentage width and height",
}

export const WithDefaultFallbackScreenWidthBlurhash = () => (
  <Image
    aspectRatio={0.62}
    blurhash="LXK,+3H#yArKH~bGx:tM.atxM*k9"
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithDefaultFallbackScreenWidthBlurhash.story = {
  name: "With default fallback screen width + blurhash",
}

export const WithWidthAndHeightBlurhash = () => (
  <Image
    blurhash="LXK,+3H#yArKH~bGx:tM.atxM*k9"
    width={250}
    height={400}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithWidthAndHeightBlurhash.story = {
  name: "With width and height + blurhash",
}

export const WithAspectRatioBlurhash = () => (
  <Image
    blurhash="LXK,+3H#yArKH~bGx:tM.atxM*k9"
    width={250}
    aspectRatio={0.62}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithAspectRatioBlurhash.story = {
  name: "With aspect ratio + blurhash",
}

export const WithoutAutomaticResizingBlurhash = () => (
  <Image
    blurhash="LXK,+3H#yArKH~bGx:tM.atxM*k9"
    aspectRatio={0.62}
    performResize={false}
    src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
  />
)

WithoutAutomaticResizingBlurhash.story = {
  name: "Without automatic resizing + blurhash",
}

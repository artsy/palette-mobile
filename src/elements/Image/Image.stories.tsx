import { storiesOf } from "@storybook/react-native"
import { Image } from "./Image"
import { Flex } from "../Flex"

storiesOf("Image", module)
  .add("With default fallback screen width", () => (
    <Image
      aspectRatio={0.62}
      src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
    />
  ))
  .add("With width and height", () => (
    <Image
      width={250}
      height={400}
      src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
    />
  ))
  .add("With aspect ratio", () => (
    <Image
      width={250}
      aspectRatio={0.62}
      src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
    />
  ))
  .add("Without automatic resizing", () => (
    <Image
      aspectRatio={0.62}
      performResize={false}
      src="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
    />
  ))
  .add("With percentage width and height", () => {
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
  })

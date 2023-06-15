import { storiesOf } from "@storybook/react-native"
import { Image } from "./Image"

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

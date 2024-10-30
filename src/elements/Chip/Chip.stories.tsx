import { Alert } from "react-native"
import { Chip } from "./Chip"
import { Flex } from "../Flex"

export default {
  title: "Chip",
  component: Chip,
}

export const Variations = () => {
  return (
    <Flex p={2} justifyContent="center" alignItems="center" gap={2}>
      <Chip title="Only title" />
      <Chip title="Title and subtitle" subtitle="Subtitle" />
      <Chip
        title="Title and image"
        image="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
      />
      <Chip
        title="Title, subtitle and image"
        subtitle="Cow image"
        image="https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"
      />
      <Chip
        title="Press me"
        subtitle="Pressing alerts something"
        onPress={() => Alert.alert("Pressed")}
      />
    </Flex>
  )
}

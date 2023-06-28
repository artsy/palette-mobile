import { EntityHeader } from "./EntityHeader"
import { AvatarSize } from "../Avatar"
import { Box } from "../Box"
import { Button } from "../Button"
import { Text } from "../Text"

export default {
  title: "EntityHeader",
  component: EntityHeader,
}

const avatarSizes: AvatarSize[] = ["xxs", "xs", "sm", "md"]

export const Initials = () => {
  return (
    <Box>
      <Text variant="md">Avatar Sizes</Text>

      <Box mx={2}>
        {avatarSizes.map((size) => (
          <Box mb={1}>
            <Text>{size}</Text>
            <EntityHeader name="Artist Name" initials="AN" meta="Meta stuff" avatarSize={size} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const Image = () => {
  return (
    <Box>
      <Text variant="md">Avatar Sizes</Text>

      <Box mx={2}>
        {avatarSizes.map((size) => (
          <Box mb={1}>
            <Text>{size}</Text>
            <EntityHeader
              imageUrl="https://picsum.photos/200/200"
              name="Artist Name"
              initials="AN"
              meta="Meta stuff"
              avatarSize={size}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const VariantSmall = () => {
  return (
    <Box>
      <Text variant="md">Avatar Sizes</Text>

      <Box mx={2}>
        {avatarSizes.map((size) => (
          <Box mb={1}>
            <Text>{size}</Text>
            <EntityHeader
              imageUrl="https://picsum.photos/200/200"
              name="Artist Name"
              initials="AN"
              meta="Meta stuff"
              avatarSize={size}
              smallVariant
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const WithRightButton = () => {
  return (
    <Box>
      <Text variant="md">Avatar Sizes</Text>

      <Box mx={2}>
        {avatarSizes.map((size) => (
          <Box mb={1}>
            <Text>{size}</Text>
            <EntityHeader
              imageUrl="https://picsum.photos/200/200"
              name="Artist Name"
              initials="AN"
              meta="Meta stuff"
              avatarSize={size}
              RightButton={<Button size="small">Right Button</Button>}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const WithLockIcon = () => {
  return (
    <Box>
      <Text variant="md">Avatar Sizes</Text>

      <Box mx={2}>
        {avatarSizes.map((size) => (
          <Box mb={1}>
            <Text>{size}</Text>
            <EntityHeader
              imageUrl="https://picsum.photos/200/200"
              name="Artist Name"
              initials="AN"
              meta="Meta stuff"
              avatarSize={size}
              showLockIcon
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

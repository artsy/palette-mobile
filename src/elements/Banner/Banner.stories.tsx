import { Banner } from "./Banner"
import { List } from "../../storybook/helpers"
import { LinkText } from "../Text"

export default {
  title: "Banner",
  component: Banner,
}

export const States = () => {
  return (
    <List contentContainerStyle={{ alignItems: undefined }}>
      <Banner
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae
        natus assumenda distinctio, voluptatum magni. autem sunt."
      />

      <Banner dismissable text="Default Light" variant="defaultLight" />

      <Banner dismissable text="Default Dark" variant="defaultDark" />
      <Banner dismissable text="Success" variant="success" />
      <Banner dismissable text="Error" variant="error" />
      <Banner dismissable text="Brand" variant="brand" />
      <Banner dismissable variant="error">
        <LinkText
          textAlign="center"
          variant="xs"
          color="mono0"
          onPress={() => console.log(`tapped`)}
        >
          Link
        </LinkText>
      </Banner>
    </List>
  )
}

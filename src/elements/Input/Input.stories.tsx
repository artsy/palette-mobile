import { SearchIcon } from "@artsy/icons/native"
import { storiesOf } from "@storybook/react-native"
import { Input } from "./Input"
import { List } from "../../storybook/helpers"
import { Join } from "../Join"
import { Separator } from "../Separator"
import { Text } from "../Text"

storiesOf("Input", module).add("Variants", () => (
  <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
    <Join separator={<Separator my={2} />}>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          Default
        </Text>
        <Input />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title
        </Text>
        <Input title="Title" />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and required
        </Text>
        <Input title="Title" required />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and optional
        </Text>
        <Input title="Title" optional />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and clear button
        </Text>
        <Input title="Title" enableClearButton />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and loading
        </Text>
        <Input title="Title" loading />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and icon
        </Text>
        <Input title="Title" icon={<SearchIcon />} />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and error
        </Text>
        <Input title="Title" error="this is an error" />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and disabled
        </Text>
        <Input title="Disabled" disabled />
      </>

      <>
        <Input placeholder="I'm a placeholder" />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title, clear button and value
        </Text>
        <Input value="5" enableClearButton />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With fixed right placeholder
        </Text>
        <Input fixedRightPlaceholder="cm" />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With placeholder
        </Text>
        <Input placeholder="I'm a placeholder" />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With title and placeholder
        </Text>
        <Input
          title="full text"
          value="Wow this is a long text, I wonder if I can read the whole thing!"
        />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          With text limit
        </Text>
        <Input title="Text with limit" maxLength={100} showLimit />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          multine Without limit
        </Text>
        <Input title="Text area" multiline />
      </>
      <>
        <Text mb={1} variant="sm-display" fontWeight="bold">
          multine With limit
        </Text>
        <Input title="Text area with limit" multiline maxLength={150} showLimit />
      </>
    </Join>
  </List>
))

import { storiesOf } from "@storybook/react-native"
import { Input } from "./Input"
import { DataList, List } from "../../storybook/helpers"
import { MagnifyingGlassIcon } from "../../svgs"
import { Box } from "../Box"

storiesOf("Input", module)
  .add("Variants", () => (
    <List contentContainerStyle={{ marginHorizontal: 20, alignItems: "stretch" }}>
      <Input />
      <Input title="Title" />
      <Input title="Title" required />
      <Input title="Title" optional />
      <Input title="Title" description="Subtitle" optional />
      <Input title="Title" description="With clear button" enableClearButton />
      <Input title="Title" description="With loading" loading />
      <Input title="Title" description="With icon" icon={<MagnifyingGlassIcon />} />
      <Input title="Title" description="With error" error="this is an error" />
      <Input title="Required" required />
      <Input title="Disabled" disabled />
      <Input placeholder="I'm a placeholder" />
      <Input description="With clear button enabled" value="5" enableClearButton />
      <Input description="With fixedRightPlaceholder" fixedRightPlaceholder="cm" />
      <Input placeholder="I'm a placeholder" />
      <Input
        title="full text"
        value="Wow this is a long text, I wonder if I can read the whole thing!"
      />
      <Input title="Text with limit" maxLength={100} showLimit />
      <Input title="Text area" multiline />
      <Input title="Text area with limit" multiline maxLength={150} showLimit />
    </List>
  ))
  .add("Multiple placeholders", () => {
    const placeholders = [
      "this is a very long placeholder",
      "this is slightly shorter",
      "how about this one",
      "much shorter",
      "even more",
    ]
    return (
      <DataList
        contentContainerStyle={{ marginHorizontal: 20, alignItems: "flex-start" }}
        data={[350, 300, 250, 200, 170, 150, 100]}
        renderItem={({ item: width }) => (
          <Box width={width}>
            <Input placeholder={placeholders} />
          </Box>
        )}
      />
    )
  })

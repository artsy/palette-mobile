import { GraphIcon } from "@artsy/icons/native"
import { storiesOf } from "@storybook/react-native"
import { useState } from "react"
import { Pill } from "./Pill"
import { List } from "../../storybook/helpers"
import { Flex } from "../Flex"

export default {
  title: "Pill",
  component: Pill,
}

storiesOf("Pill", module)
  .add("Variants", () => (
    <List
      contentContainerStyle={{
        marginHorizontal: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Flex flexDirection="row" gap={1}>
        <Pill>Default</Pill>
        <Pill selected>Selected</Pill>
        <Pill disabled>Disabled</Pill>
      </Flex>

      <Flex flexDirection="row" gap={1}>
        <Pill variant="filter">Filter</Pill>
        <Pill variant="filter" selected>
          Selected
        </Pill>
        <Pill variant="filter" disabled>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row" gap={1}>
        <Pill Icon={GraphIcon} variant="badge">
          Badge
        </Pill>
        <Pill Icon={GraphIcon} variant="badge" selected>
          Selected
        </Pill>
        <Pill Icon={GraphIcon} variant="badge" disabled>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row" gap={1}>
        <Pill variant="profile">Profile</Pill>
        <Pill variant="profile" selected>
          Selected
        </Pill>
        <Pill variant="profile" disabled>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row" gap={1}>
        <Pill variant="search">Unique</Pill>
        <Pill variant="search" selected>
          Painting
        </Pill>
        <Pill variant="search" disabled>
          Sculpture
        </Pill>
      </Flex>

      <Flex flexDirection="row" gap={1}>
        <Pill variant="search">Search</Pill>
        <Pill variant="search" selected>
          Selected
        </Pill>
        <Pill variant="search" disabled>
          Search
        </Pill>
      </Flex>
    </List>
  ))
  .add("Profile with image", () => (
    <List contentContainerStyle={{ marginHorizontal: 20, gap: 1 }}>
      <Pill variant="profile" src={src}>
        Artist
      </Pill>
      <Pill variant="profile" src={src} selected>
        Selected
      </Pill>
      <Pill variant="profile" src={src} disabled>
        Disabled
      </Pill>
    </List>
  ))
  .add("Controlled state", () => {
    const [selected, setSelected] = useState(false)

    return (
      <List contentContainerStyle={{ marginHorizontal: 20, gap: 1 }}>
        <Pill selected={selected} onPress={() => setSelected((prev) => !prev)}>
          Pill
        </Pill>
      </List>
    )
  })
  .add("Onboarding", () => {
    return (
      <List contentContainerStyle={{ marginHorizontal: 20, gap: 1 }}>
        <Pill variant="onboarding" selected>
          Yes, I love collecting art
        </Pill>
        <Pill variant="onboarding">No, I'm just starting out</Pill>
      </List>
    )
  })
  .add("Link", () => {
    return (
      <List contentContainerStyle={{ marginHorizontal: 20 }}>
        <Pill variant="link">Yes, I love collecting art</Pill>
      </List>
    )
  })

const src = "https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"

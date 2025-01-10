import { storiesOf } from "@storybook/react-native"
import { useState } from "react"
import { Pill } from "./Pill"
import { List } from "../../storybook/helpers"
import { GraphIcon } from "../../svgs"
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
      <Flex flexDirection="row">
        <Pill>Default</Pill>
        <Pill selected ml={1}>
          Selected
        </Pill>
        <Pill disabled ml={1}>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row">
        <Pill variant="filter">Filter</Pill>
        <Pill variant="filter" selected ml={1}>
          Selected
        </Pill>
        <Pill variant="filter" disabled ml={1}>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row">
        <Pill Icon={GraphIcon} variant="badge">
          Badge
        </Pill>
        <Pill Icon={GraphIcon} variant="badge" selected ml={1}>
          Selected
        </Pill>
        <Pill Icon={GraphIcon} variant="badge" disabled ml={1}>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row">
        <Pill variant="profile">Profile</Pill>
        <Pill variant="profile" selected ml={1}>
          Selected
        </Pill>
        <Pill variant="profile" disabled ml={1}>
          Disabled
        </Pill>
      </Flex>

      <Flex flexDirection="row">
        <Pill variant="search">Unique</Pill>
        <Pill variant="search" selected ml={1}>
          Painting
        </Pill>
        <Pill variant="search" disabled ml={1}>
          Sculpture
        </Pill>
      </Flex>

      <Flex flexDirection="row">
        <Pill variant="search">Search</Pill>
        <Pill variant="search" selected ml={1}>
          Selected
        </Pill>
        <Pill variant="search" disabled ml={1}>
          Search
        </Pill>
      </Flex>
    </List>
  ))
  .add("Profile with image", () => (
    <List contentContainerStyle={{ marginHorizontal: 20 }}>
      <Pill variant="profile" src={src}>
        Artist
      </Pill>
      <Pill variant="profile" src={src} selected ml={1}>
        Selected
      </Pill>
      <Pill variant="profile" src={src} disabled ml={1}>
        Disabled
      </Pill>
    </List>
  ))
  .add("Controlled state", () => {
    const [selected, setSelected] = useState(false)

    return (
      <List contentContainerStyle={{ marginHorizontal: 20 }}>
        <Pill selected={selected} onPress={() => setSelected((prev) => !prev)}>
          Pill
        </Pill>
      </List>
    )
  })
  .add("Onboarding", () => {
    return (
      <List contentContainerStyle={{ marginHorizontal: 20 }}>
        <Pill variant="onboarding" selected>
          Yes, I love collecting art
        </Pill>
        <Pill variant="onboarding" ml={1}>
          No, I'm just starting out
        </Pill>
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

import { GraphIcon } from "@artsy/icons/native"
import { useState } from "react"
import { Pill } from "./Pill"
import { List } from "../../storybook/helpers"
import { Flex } from "../Flex"

export default {
  title: "Pill",
}

export const Variants = () => (
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
)

export const ProfileWithImage = () => (
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
)

ProfileWithImage.story = {
  name: "Profile with image",
}

export const ControlledState = () => {
  const [selected, setSelected] = useState(false)

  return (
    <List contentContainerStyle={{ marginHorizontal: 20, gap: 1 }}>
      <Pill selected={selected} onPress={() => setSelected((prev) => !prev)}>
        Pill
      </Pill>
    </List>
  )
}

ControlledState.story = {
  name: "Controlled state",
}

export const Onboarding = () => {
  return (
    <List contentContainerStyle={{ marginHorizontal: 20, gap: 1 }}>
      <Pill variant="onboarding" selected>
        Yes, I love collecting art
      </Pill>
      <Pill variant="onboarding">No, I'm just starting out</Pill>
    </List>
  )
}

export const Link = () => {
  return (
    <List contentContainerStyle={{ marginHorizontal: 20 }}>
      <Pill variant="link">Yes, I love collecting art</Pill>
    </List>
  )
}

const src = "https://d32dm0rphc51dk.cloudfront.net/A983VUIZusVBKy420xP3ow/normalized.jpg"

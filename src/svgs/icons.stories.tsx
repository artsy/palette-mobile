import * as ArtsyIcons from "@artsy/icons/native"
import * as Icons from "."
import { Icon } from "./Icon"
import { Theme } from "../Theme"
import { Box } from "../elements"
import { Flex } from "../elements/Flex"
import { Spacer } from "../elements/Spacer"
import { Text } from "../elements/Text"
import { List } from "../storybook/helpers"

export default {
  title: "Icons",
  component: Icon,
}

export const AllIcons = () => {
  return (
    <Theme theme="v3light">
      <AllIconsWithoutTheme />
    </Theme>
  )
}

const allIcons = Object.entries(Icons)

type IconComponent = Exclude<(typeof Icons)[keyof typeof Icons], typeof ArtsyIcons.ICONS>

const AllIconsWithoutTheme = () => {
  return (
    <Box>
      <List
        style={{ marginLeft: 35, marginBottom: 50 }}
        contentContainerStyle={{ alignItems: "flex-start" }}
      >
        <>
          <Text variant="md" mb={2}>
            Palette Mobile Icons
          </Text>
          {allIcons.map((icon) => {
            const Comp = icon[1]
            const name = icon[0]
            return (
              <Flex flexDirection="row" alignItems="center" mb={0.5}>
                {/* TODO: remove `long` when we add ArrowLeftIcon to Artsy Icons  */}
                <Comp fill="black100" long />
                <Spacer x={1} />
                <Text>{name}</Text>
              </Flex>
            )
          })}

          <Text variant="md" my={2}>
            Artsy Icons
          </Text>
          {ArtsyIcons.ICONS.map((icon) => {
            const IconComponent = ArtsyIcons[
              icon.componentName as keyof typeof ArtsyIcons
            ] as IconComponent
            const name = icon.componentName
            return (
              <Flex flexDirection="row" alignItems="center" mb={0.5}>
                <IconComponent fill="black100" />
                <Spacer x={1} />
                <Text>{name}</Text>
              </Flex>
            )
          })}
        </>
      </List>
    </Box>
  )
}

import { Platform, Text as RNText, TextStyle, View } from "react-native"
import { DataList, List } from "../../storybook/helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { LinkText, Text, TextProps } from "../Text"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Text> = {
  title: "Theme/Text",
  component: Text,
}
export default meta
type TextStory = StoryObj<typeof Text>

const variants: Array<TextProps["variant"]> = ["xs", "sm", "md", "lg", "xl", "xxl"]
export const Variants: TextStory = {
  render: () => (
    <DataList
      data={variants}
      renderItem={({ item: variant }) => (
        <Text variant={variant}>{variant} ~~ This is a text.</Text>
      )}
    />
  ),
}

export const VariantsInBoxes: TextStory = {
  render: () => (
    <DataList
      data={variants}
      renderItem={({ item: variant }) => (
        <Box borderWidth={1} borderColor="black" width={100}>
          <Text variant={variant}>{variant} ~~ This is a text.</Text>
        </Box>
      )}
    />
  ),
}

export const BasicProps: TextStory = {
  render: () => (
    <List>
      <Box backgroundColor="pink">
        <Text>I AM FROM GITHUB ACTIONS :)</Text>
      </Box>
      <Text>regular ~~ This is a text.</Text>
      <LinkText>LinkText.</LinkText>
      <Text caps>caps ~~ This is a text.</Text>
      <Text italic>italics ~~ This is a text.</Text>
      <Text caps italic>
        caps italics ~~ This is a text.
      </Text>
      <Text weight="medium">weight: medium ~~ This is a text.</Text>
      <Text maxWidth>maxwidth ~~ This is a text.</Text>
    </List>
  ),
}

export const Misc: TextStory = {
  render: () => (
    <List>
      <View style={{ borderWidth: 1, borderColor: "black" }}>
        <Text pl={2} mb={4} mr={80} color="red" backgroundColor="orange">
          Testing the other props
        </Text>
      </View>
      <View />
      <Text lineHeight="20px" fontSize={30}>
        wow
      </Text>
    </List>
  ),
}

// this is useful for making sure our custom fonts are rendering at the same height for ios and android
export const FontCenteringRaw: TextStory = {
  render: () => {
    const style: TextStyle = { borderWidth: 1, borderColor: "black", fontSize: 16, lineHeight: 16 }
    const systemFontStyle: TextStyle =
      Platform.OS === "android" ? { textAlignVertical: "bottom" } : {} // this we add in our Text in palette-eigen
    const unicaFontStyle: TextStyle =
      Platform.OS === "android" ? { textAlignVertical: "center" } : {} // this we add in our Text in palette-eigen

    return (
      <Flex flexDirection="row" flex={1}>
        <Flex flex={1}>
          <RNText>System font</RNText>
          <List>
            <RNText style={[style, systemFontStyle]}>regular TEXT.</RNText>
            <RNText style={[style, systemFontStyle]}>ALL CAPS text.</RNText>
          </List>
        </Flex>

        <Flex width="1px" height="100%" borderWidth={1} borderColor="black" />

        <Flex flex={1}>
          <RNText>Unica custom font</RNText>
          <List>
            <RNText style={[style, { fontFamily: "Unica77LL-Regular" }, unicaFontStyle]}>
              regular TEXT.
            </RNText>
            <RNText style={[style, { fontFamily: "Unica77LL-Regular" }, unicaFontStyle]}>
              ALL CAPS text.
            </RNText>
          </List>
        </Flex>
      </Flex>
    )
  },
}

// this is useful for making sure our custom fonts are rendering at the same height for ios and android
export const FontCenteringPalette: TextStory = {
  render: () => {
    const style: TextStyle = { borderWidth: 1, borderColor: "black", fontSize: 16, lineHeight: 16 }

    return (
      <Flex flex={1}>
        <Text>System font</Text>
        <List>
          <Text style={style}>regular TEXT.</Text>
          <Text style={style}>ALL CAPS text.</Text>
        </List>
      </Flex>
    )
  },
}

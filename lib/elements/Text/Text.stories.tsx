import { ComponentMeta, ComponentStory } from "@storybook/react-native"
import { Platform, Text as RNText, TextStyle, View } from "react-native"
import { LinkText, Text, TextProps } from "."
import { DataList, List } from "../../storybook/helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"

const TextMeta: ComponentMeta<typeof Text> = {
  title: "Theme/Text",
  component: Text,
}
export default TextMeta
type TextStory = ComponentStory<typeof Text>

const variants: Array<TextProps["variant"]> = ["xs", "sm", "md", "lg", "xl", "xxl"]
export const Variants: TextStory = () => (
  <DataList
    data={variants}
    renderItem={({ item: variant }) => <Text variant={variant}>{variant} ~~ This is a text.</Text>}
  />
)

export const VariantsInBoxes: TextStory = () => (
  <DataList
    data={variants}
    renderItem={({ item: variant }) => (
      <Box borderWidth={1} borderColor="black" width={100}>
        <Text variant={variant}>{variant} ~~ This is a text.</Text>
      </Box>
    )}
  />
)

export const BasicProps: TextStory = () => (
  <List>
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
)

export const Misc: TextStory = () => (
  <List>
    <View style={{ borderWidth: 1, borderColor: "black" }}>
      <Text pl={2} mb={4} mr={80} color="red" backgroundColor="orange">
        Testing the other props
      </Text>
    </View>
    <View />
  </List>
)

// this is useful for making sure our custom fonts are rendering at the same height for ios and android
export const FontCenteringRaw: TextStory = () => {
  const style: TextStyle = { borderWidth: 1, borderColor: "black", fontSize: 16, lineHeight: 16 }
  const systemFontStyle: TextStyle =
    Platform.OS === "android" ? { textAlignVertical: "bottom" } : {} // this we add in our Text in palette-eigen
  const unicaFontStyle: TextStyle = Platform.OS === "android" ? { textAlignVertical: "center" } : {} // this we add in our Text in palette-eigen

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
}

// this is useful for making sure our custom fonts are rendering at the same height for ios and android
export const FontCenteringPalette: TextStory = () => {
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
}

import { getStorybookUI } from "@storybook/react-native"
import "./storybook.requires"
import { clearDecorators } from "@storybook/react-native"

clearDecorators()

export const StorybookUIRoot = getStorybookUI({})

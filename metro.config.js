const path = require("path")
const withStorybook = require("@storybook/react-native/metro/withStorybook")
const { getDefaultConfig } = require("expo/metro-config")

const defaultConfig = getDefaultConfig(__dirname)

module.exports = withStorybook(defaultConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, "./.storybook"),
  useJs: true,
})

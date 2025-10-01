const path = require("path")
const { generate } = require("@storybook/react-native/scripts/generate")
const { getDefaultConfig } = require("expo/metro-config")

generate({
  configPath: path.resolve(__dirname, "./.storybook"),
  useJs: true,
})

const defaultConfig = getDefaultConfig(__dirname)

module.exports = defaultConfig

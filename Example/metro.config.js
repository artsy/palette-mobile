const path = require("path")
const withStorybook = require("@storybook/react-native/metro/withStorybook")
const { getDefaultConfig } = require("expo/metro-config")

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, "..")

const defaultConfig = getDefaultConfig(projectRoot)

// Watch all files in the monorepo
defaultConfig.watchFolders = [workspaceRoot]

// Let Metro know where to resolve packages from
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
]

// Map @artsy/palette-mobile to the parent src directory
defaultConfig.resolver.extraNodeModules = {
  "@artsy/palette-mobile": path.resolve(workspaceRoot, "src"),
}

module.exports = withStorybook(defaultConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, "./.storybook"),
  useJs: true,
})

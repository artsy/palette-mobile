module.exports = {
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-decorators", { version: "legacy" }],
    ["@babel/plugin-proposal-private-methods", { loose: true }], // needed for latest jest, must come after decorators
    // NOTE: do not add react-native-reanimated/plugin here. babel-preset-expo
    // auto-adds react-native-worklets/plugin (Reanimated 4), and applying it
    // twice breaks worklets at runtime.
  ],
  presets: [["babel-preset-expo", { jsxRuntime: "automatic" }], "@babel/preset-typescript"],
}

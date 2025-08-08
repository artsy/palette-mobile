module.exports = {
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-decorators", { version: "legacy" }],
    ["@babel/plugin-proposal-private-methods", { loose: true }], // needed for latest jest, must come after decorators
    ["@babel/plugin-proposal-class-properties", { loose: true }], // must come after decorators
    "react-native-reanimated/plugin", // should be LAST
  ],
  presets: [["babel-preset-expo", { jsxRuntime: "automatic" }], "@babel/preset-typescript"],
}

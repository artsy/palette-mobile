const plugins = [
  "@babel/plugin-transform-flow-strip-types",
  ["@babel/plugin-proposal-decorators", { version: "legacy" }],
  ["@babel/plugin-proposal-private-methods", { loose: true }], // needed for latest jest, must come after decorators
  ["@babel/plugin-proposal-class-properties", { loose: true }], // must come after decorators
  "react-native-reanimated/plugin", // should be LAST
]

const presets = [
  [
    "module:metro-react-native-babel-preset",
    { useTransformReactJSXExperimental: true }, // this is so `import React from "react"` is not needed.
  ],
  "@babel/preset-typescript",
  ["@babel/preset-react", { runtime: "automatic" }], // this is so `import React from "react"` is not needed.
]

module.exports = {  plugins,presets }

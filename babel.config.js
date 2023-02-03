const plugins = [
  ["@babel/plugin-proposal-private-methods", { loose: true }],
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

module.exports = { presets, plugins }

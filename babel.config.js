const presets = [
  [
    "module:metro-react-native-babel-preset",
    { useTransformReactJSXExperimental: true }, // this is so `import React from "react"` is not needed.
  ],
  "@babel/preset-typescript",
  ["@babel/preset-react", { runtime: "automatic" }], // this is so `import React from "react"` is not needed.
]

const plugins = ["react-native-reanimated/plugin"]

module.exports = { presets, plugins }

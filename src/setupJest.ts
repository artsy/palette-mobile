import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("react-native-blurhash", () => {
  const ReactNative = require("react-native")
  return {
    Blurhash: ReactNative.View as any,
  }
})

// Reanimated 4.7 added initializers.native.ts, which calls setCSSEventHandler on the module. Under
// Jest the module is JSReanimated, which throws for that call, so use the JS initializer instead.
jest.mock("react-native-reanimated/src/initializers", () =>
  jest.requireActual("react-native-reanimated/src/initializers.ts")
)
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))
jest.mock("react-native-worklets", () => require("react-native-worklets/src/mock"))

import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("react-native-blurhash", () => {
  const ReactNative = require("react-native")
  return {
    Blurhash: ReactNative.View as any,
  }
})

require("react-native-reanimated").setUpTests()
//
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))

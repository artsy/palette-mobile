// @ts-expect-error
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

require("react-native-reanimated/src/reanimated2/jestUtils").setUpTests()
// @ts-expect-error
global.__reanimatedWorkletInit = () => {}
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))

jest.mock("expo-image", () => {
  const ReactNative = require("react-native")
  return {
    Image: ReactNative.Image,
  }
})

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "Light",
    Medium: "Medium",
    Heavy: "Heavy",
  },
  NotificationFeedbackType: {
    Success: "Success",
    Warning: "Warning",
    Error: "Error",
  },
}))

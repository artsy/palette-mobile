// @ts-expect-error
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

require("react-native-reanimated/src/reanimated2/jestUtils").setUpTests()
// @ts-expect-error
global.__reanimatedWorkletInit = () => {}
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))

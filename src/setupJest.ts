import "@testing-library/react-native/extend-expect"

import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

require("react-native-reanimated").setUpTests()

import "@testing-library/react-native/extend-expect"

import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

require("react-native-reanimated").setUpTests()

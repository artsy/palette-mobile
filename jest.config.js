module.exports = {
  cacheDirectory: ".cache/jest",
  moduleFileExtensions: ["ts", "tsx", "js"],
  preset: "react-native",
  rootDir: ".",
  setupFilesAfterEnv: [
    "jest-extended",
    "@testing-library/jest-native/extend-expect",
    "./src/setupJest.ts",
  ],
  testMatch: ["<rootDir>/src/**/*.tests.(ts|tsx|js)"],
  testEnvironment: "node",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  transform: {
    ".*(ts|tsx|js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native(-.*)?/(@react-native-community/.*))?|react-navigation|@react-navigation/.*)",
  ],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
}

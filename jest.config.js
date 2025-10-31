module.exports = {
  cacheDirectory: ".cache/jest",
  moduleFileExtensions: ["ts", "tsx", "js"],
  preset: "react-native",
  rootDir: ".",
  setupFilesAfterEnv: ["jest-extended", "./src/setupJest.ts"],
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
  moduleNameMapper: {
    "^react-native-blurhash$": "react-native-blurhash/src/index.tsx",
  },
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
}

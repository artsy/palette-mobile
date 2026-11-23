module.exports = {
  cacheDirectory: ".cache/jest",
  moduleFileExtensions: ["ts", "tsx", "js"],
  preset: "@react-native/jest-preset",
  rootDir: ".",
  // Reanimated's documented Jest resolver (also chains react-native-worklets' resolver). It routes
  // reanimated's initializers etc. to their web builds; the native ones throw under JSReanimated.
  resolver: "react-native-reanimated/jest/resolver",
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

/* eslint-disable no-unused-vars */
const OFF = "off"
const WARN = "warn"
const ERR = "error"
/* eslint-enable no-unused-vars */

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/jsx-runtime",
    "plugin:storybook/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json" },
  settings: {
    // This is needed to make eslint happy with name aliases
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default
        // use <root>/path/to/folder/tsconfig.json
        project: "<root>/tsconfig.json",
      },
    },
  },
  rules: {
    "import/order": [
      ERR,
      {
        alphabetize: { order: "asc" },
        groups: ["builtin", "external", "internal", "index", "sibling", "parent", "object", "type"],
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": ERR, // this helps with bugs like in jsx `{foo && <Text>wow</Text>}` when foo is not a strict boolean
    // we want to enable some of these
    "import/no-named-as-default": OFF,
    "no-empty-pattern": OFF,
    "no-control-regex": OFF,
    "no-extra-boolean-cast": OFF,
    "no-redeclare": OFF,
    "no-undef": OFF,
    "no-unused-vars": OFF,
    "import/no-unresolved": OFF,
    "import/no-duplicates": OFF, // re-enable this
    "no-useless-catch": OFF,
    "no-useless-escape": OFF,
    "react/react-in-jsx-scope": OFF,
    "react-native/no-inline-styles": OFF,
    "@typescript-eslint/no-unused-vars": OFF,
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/no-var-requires": OFF,
    "@typescript-eslint/ban-ts-comment": OFF,
    "@typescript-eslint/explicit-module-boundary-types": OFF,
  },
}

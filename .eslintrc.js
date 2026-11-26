const OFF = "off"
const WARN = "warn"
const ERR = "error"

module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "jest", "react-hooks", "testing-library"],
  extends: [
    "plugin:react-native-a11y/basic",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:testing-library/react",
    "prettier", // "prettier" needs to be last!
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      WARN,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    "react-hooks/exhaustive-deps": WARN,

    /**
     * Errors
     */

    "import/order": [
      ERR,
      {
        alphabetize: { order: "asc" },
        groups: ["builtin", "external", "internal", "index", "sibling", "parent", "object", "type"],
      },
    ],
    "import/no-duplicates": ERR,
    "react/jsx-curly-brace-presence": ERR,
    "react-hooks/rules-of-hooks": ERR,

    /**
     * Disabled
     */

    "@typescript-eslint/await-thenable": OFF,
    "@typescript-eslint/ban-ts-comment": OFF,
    "@typescript-eslint/ban-types": OFF,
    "@typescript-eslint/explicit-module-boundary-types": OFF,
    "@typescript-eslint/no-empty-function": OFF,
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/no-floating-promises": OFF,
    "@typescript-eslint/no-implied-eval": OFF,
    "@typescript-eslint/no-misused-promises": OFF,
    "@typescript-eslint/no-non-null-asserted-optional-chain": OFF,
    "@typescript-eslint/no-non-null-assertion": OFF,
    "@typescript-eslint/no-unnecessary-type-assertion": OFF,
    "@typescript-eslint/no-unsafe-argument": OFF,
    "@typescript-eslint/no-unsafe-assignment": OFF,
    "@typescript-eslint/no-unsafe-call": OFF,
    "@typescript-eslint/no-unsafe-member-access": OFF,
    "@typescript-eslint/no-unsafe-return": OFF,
    "@typescript-eslint/no-var-requires": OFF,
    "@typescript-eslint/require-await": OFF,
    "@typescript-eslint/restrict-plus-operands": OFF,
    "@typescript-eslint/restrict-template-expressions": OFF,
    "@typescript-eslint/strict-boolean-expressions": OFF,
    "@typescript-eslint/unbound-method": OFF,
    "import/default": OFF,
    "import/namespace": OFF,
    "import/no-named-as-default-member": OFF,
    "import/no-named-as-default": OFF,
    "import/no-unresolved": OFF,
    "no-control-regex": OFF,
    "no-empty-pattern": OFF,
    "no-extra-boolean-cast": OFF,
    "no-redeclare": OFF,
    "no-undef": OFF,
    "no-useless-catch": OFF,
    "no-useless-escape": OFF,
    "react-native/no-inline-styles": OFF,
    "react/react-in-jsx-scope": OFF,
    "react-native-a11y/has-accessibility-hint": OFF,
  },
  overrides: [
    {
      // Test files and shared test helpers
      files: [
        "src/**/__tests__/**/*.[jt]s?(x)",
        "src/**/?(*.)+(spec|test).[jt]s?(x)",
        "src/**/*.tests.ts",
        "src/**/*.tests.tsx",
        "src/utils/tests/**",
      ],
      extends: ["plugin:testing-library/react"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        // @react-native/typescript-config lists `es2024.promise`, which @typescript-eslint/parser v5
        // can't map to scope-analysis globals. Setting `lib` here skips that lookup; type
        // information still comes from the full tsconfig.
        lib: ["esnext"],
      },
      rules: {
        // render, fireEvent, act and renderWithWrappers are async in RNTL v14: a missing `await`
        // lets the test continue before React has flushed.
        "@typescript-eslint/no-floating-promises": ERR,
        // RNTL v14 makes fireEvent async (and userEvent already is), so awaiting them must be allowed.
        "testing-library/no-await-sync-events": OFF,
        // fdescribe/fit/.only silently skip every other test in the file
        "jest/no-focused-tests": ERR,
        "no-restricted-imports": [
          ERR,
          {
            paths: [
              {
                name: "react-test-renderer",
                message:
                  "Use @testing-library/react-native (`renderWithWrappers`, `screen`, `act`) instead. RNTL v14 drops react-test-renderer.",
              },
            ],
            patterns: [
              {
                group: ["react-test-renderer/*"],
                message:
                  "Use @testing-library/react-native instead. RNTL v14 drops react-test-renderer.",
              },
            ],
          },
        ],
        "no-restricted-syntax": [
          ERR,
          {
            selector: "Identifier[name=/^UNSAFE_(root|(get|query)(All)?By(Type|Props))$/]",
            message:
              "UNSAFE_* queries are removed in RNTL v14. Query by role, label, text or testID instead.",
          },
        ],
      },
    },
  ],
}

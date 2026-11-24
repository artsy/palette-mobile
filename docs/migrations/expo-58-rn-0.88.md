# Expo SDK 58 / React Native 0.88 (palette-mobile v25+)

palette-mobile v25 and later target Expo SDK 58, React Native 0.88 and React 19.3. Consumers (e.g. Eigen)
need the steps below when upgrading.

## 1. React Native types

RN 0.88 makes the [Strict TypeScript API](https://reactnative.dev/docs/strict-typescript-api) the
default and only exposes its types through `package.json` `exports`. With `moduleResolution: "node"`
(Node10), TypeScript ignores `exports` and `react-native` resolves to an untyped module.

### From v26.0.0: no type setup needed

palette-mobile's `dist/*.d.ts` is built against the Strict TypeScript API, and works with both the
strict and the legacy types. If you added one of the stopgaps below for v25.0.0, remove it and
migrate your app to the strict types. The legacy types are slated for removal after RN 0.89, so
this has to happen before RN 0.90.

With `bundler` / `node16` / `nodenext` resolution (e.g. extending `@react-native/typescript-config`,
as Eigen does), the strict types resolve with no extra config. With `node` / `node10`, map
`react-native` to them directly (path relative to `baseUrl`):

```jsonc
{
  "compilerOptions": {
    "paths": {
      "react-native": ["<path-to>/node_modules/react-native/types_generated/index.d.ts"]
    }
  }
}
```

Typing a ref you pass to a palette component:

| Component     | Strict types                               | Legacy types       |
| ------------- | ------------------------------------------ | ------------------ |
| `Box`, `Flex` | `useRef<ViewInstance>` (or `HostInstance`) | `useRef<View>`     |
| `Input`       | `useRef<InputRef>`                         | `useRef<InputRef>` |

`export type Input` is now `InputRef` (it was `TextInput`). That's the ref `Input` actually exposes:
`focus`, `blur` and `clear`. A ref typed as `Input` that calls other `TextInput` methods, like
`isFocused()` or `measure()`, no longer compiles. Those calls returned `undefined` at runtime anyway.

### v25.0.0 only: point at the legacy types

v25.0.0's `dist/*.d.ts` is built against the legacy types. Point `react-native` at them in your
`tsconfig.json`. Which option depends on your `moduleResolution`:

**`bundler` / `node16` / `nodenext`**: opt into the legacy types with a custom condition. No path
mapping needed.

```jsonc
{
  "compilerOptions": {
    "customConditions": ["react-native-legacy-deep-imports", "react-native"]
  }
}
```

**`node` / `node10`**: `customConditions` and `exports` are ignored, so map the module directly:

```jsonc
{
  "compilerOptions": {
    "paths": {
      // path is relative to baseUrl
      "react-native": ["<path-to>/node_modules/react-native/types_DEPRECATED/index.d.ts"]
    }
  }
}
```

## 2. Reanimated 4.7 under Jest

Reanimated 4.7's native initializer calls `setCSSEventHandler`, which throws under Jest
(`JSReanimated`), so any test that imports reanimated fails. Use reanimated's documented Jest
resolver (it also chains the `react-native-worklets` resolver):

```js
// jest.config.js
module.exports = {
  resolver: "react-native-reanimated/jest/resolver",
}
```

If you already have a custom resolver, call reanimated's resolver from it. This replaces patching
`JSReanimated.setCSSEventHandler` to a no-op.

## 3. Removed React Native APIs

RN 0.88 removed `InteractionManager`, the `Touchable` root export, the `NativeMethods` types, the
`Modal` `animated` prop and `StatusBar` `backgroundColor` / `translucent` (Android is always
edge-to-edge). palette-mobile uses none of them, but check your app code.

## 4. Other SDK 58 changes to check

- `react-native-gesture-handler` is now v3 (major).
- R8 is enabled by default for Android release builds. Reflection-heavy libraries may need keep
  rules.
- iOS prebuild now generates a `SceneDelegate` (scene lifecycle).

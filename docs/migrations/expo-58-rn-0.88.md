# Expo SDK 58 / React Native 0.88 (palette-mobile v25)

palette-mobile v25 targets Expo SDK 58, React Native 0.88 and React 19.3. Consumers (e.g. Eigen)
need the steps below when upgrading.

## 1. React Native types

RN 0.88 makes the [Strict TypeScript API](https://reactnative.dev/docs/strict-typescript-api) the
default and only exposes its types through `package.json` `exports`. With `moduleResolution: "node"`
(Node10), TypeScript ignores `exports` and `react-native` resolves to an untyped module.

palette-mobile's `dist/*.d.ts` is still built against the legacy types, so until the Strict TS API
migration lands, map `react-native` to them in your `tsconfig.json`:

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

The legacy types are slated for removal after RN 0.89, so this is temporary.

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

If you already have a custom resolver, call reanimated's resolver from it.

## 3. Removed React Native APIs

RN 0.88 removed `InteractionManager`, the `Touchable` root export, the `NativeMethods` types, the
`Modal` `animated` prop and `StatusBar` `backgroundColor` / `translucent` (Android is always
edge-to-edge). palette-mobile uses none of them, but check your app code.

## 4. Other SDK 58 changes to check

- `react-native-gesture-handler` is now v3 (major).
- R8 is enabled by default for Android release builds. Reflection-heavy libraries may need keep
  rules.
- iOS prebuild now generates a `SceneDelegate` (scene lifecycle).

import React from "react"
import { LogBox } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced"
import { StorybookUIRoot } from "../.storybook/Storybook"

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.'])

export const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlipperAsyncStorage />
        <StorybookUIRoot />
      </GestureHandlerRootView>
    </>
  )
}

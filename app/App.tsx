import React from "react"
import { StorybookUIRoot } from "../.storybook/Storybook"
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced"
import { LogBox } from "react-native"

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.'])

export const App = () => {
  return (
    <>
      <FlipperAsyncStorage />
      <StorybookUIRoot />
    </>
  )
}

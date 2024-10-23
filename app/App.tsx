import React from "react"
import { LogBox } from "react-native"
import { StorybookUIRoot } from "../.storybook/Storybook"

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.'])

export const App: React.FC = () => {
  return (
    <>
      <StorybookUIRoot />
    </>
  )
}

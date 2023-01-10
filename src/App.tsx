import React from "react"
import { StorybookUIRoot } from "../.storybook/Storybook"
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced"

export const App = () => {
  return (
    <>
      <FlipperAsyncStorage />
      <StorybookUIRoot />
    </>
  )
}

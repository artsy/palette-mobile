import React, { useEffect } from "react"
import { LogBox, Alert } from "react-native"
import StorybookUIRoot from "../.storybook/Storybook"

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.'])

export const App: React.FC = () => {
  useEffect(() => {
    const checkForUpdates = async () => {
      if (__DEV__) return

      try {
        const Updates = require("expo-updates")
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          Alert.alert(
            "Update Available",
            "A new update is available. Would you like to download it?",
            [
              { text: "Later", style: "cancel" },
              {
                text: "Update",
                onPress: async () => {
                  await Updates.fetchUpdateAsync()
                  Alert.alert(
                    "Update Ready",
                    "The update has been downloaded. Restart the app to apply it.",
                    [{ text: "Restart", onPress: () => Updates.reloadAsync() }]
                  )
                },
              },
            ]
          )
        }
      } catch (e) {
        console.log("Error checking for updates:", e)
      }
    }

    checkForUpdates()
  }, [])

  return (
    <>
      <StorybookUIRoot />
    </>
  )
}

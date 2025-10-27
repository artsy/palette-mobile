import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Appearance, Platform, StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Theme } from "../Theme"
import { Flex, Pill, Text } from "../elements"
import { ScreenDimensionsProvider } from "../utils/hooks"
import type { Decorator } from "@storybook/react"

export const withTheme: Decorator = (story) => <Theme theme="v3light">{story()}</Theme>

const DARK_MODE_STORAGE_KEY = "dark-mode-mode"

export const useDarkModeSwitcher: Decorator = (story) => {
  const [mode, setModeState] = useState<"light" | "dark" | "system">("system")
  const [systemMode, setSystemMode] = useState<"light" | "dark">(
    Appearance.getColorScheme() ?? "light"
  )

  // Load initial value from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(DARK_MODE_STORAGE_KEY)
      .then((value) => {
        if (value && (value === "light" || value === "dark" || value === "system")) {
          setModeState(value as "light" | "dark" | "system")
        }
      })
      .catch((error) => {
        console.error("Failed to load dark mode preference:", error)
      })
  }, [])

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemMode(colorScheme ?? "light")
    })
    return () => subscription.remove()
  }, [])

  const setMode = (newMode: "light" | "dark" | "system") => {
    setModeState(newMode)
    AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, newMode).catch((error) => {
      console.error("Failed to save dark mode preference:", error)
    })
  }

  const isDarkMode = mode === "dark" || (mode === "system" && systemMode === "dark")
  const theme = isDarkMode ? "v3dark" : "v3light"

  return (
    <ScreenDimensionsProvider>
      <SafeAreaProvider>
        <Theme theme={theme}>
          <StatusBar
            // We are keeping the status bar white on darkmode on ios because background isn't a supported prop on iOS
            barStyle={isDarkMode && Platform.OS === "android" ? "light-content" : "dark-content"}
            backgroundColor={isDarkMode && Platform.OS === "android" ? "black" : "white"}
            translucent={true}
          />

          <Flex flex={1} backgroundColor="mono0">
            <Flex flexDirection="row" justifyContent="space-around" py={1} backgroundColor="mono5">
              <Text color="mono100">Dark mode</Text>

              <Flex flexDirection="row" gap={1}>
                <Pill
                  variant="default"
                  selected={mode === "light"}
                  onPress={() => setMode("light")}
                >
                  Light
                </Pill>
                <Pill variant="default" selected={mode === "dark"} onPress={() => setMode("dark")}>
                  Dark
                </Pill>
                <Pill
                  variant="default"
                  selected={mode === "system"}
                  onPress={() => setMode("system")}
                >
                  System
                </Pill>
              </Flex>
            </Flex>
            <Flex p={2}>{story()}</Flex>
          </Flex>
        </Theme>
      </SafeAreaProvider>
    </ScreenDimensionsProvider>
  )
}

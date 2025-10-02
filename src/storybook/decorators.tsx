import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Appearance } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Theme } from "../Theme"
import { Flex } from "../elements/Flex"
import { LinkText, Text } from "../elements/Text"
import { ScreenDimensionsProvider } from "../utils/hooks"
import type { Decorator } from "@storybook/react"

export const withTheme: Decorator = (story) => (
  <Theme theme="v3light">
    <Text color="red">aaww</Text>
    {story()}
  </Theme>
)

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
          <Flex flex={1} backgroundColor="background">
            <Flex flexDirection="row" justifyContent="space-around">
              <Text color="orange">
                Dark mode: {mode} {mode === "system" && "(" + systemMode + ")"}
              </Text>
              <LinkText color="orange" onPress={() => setMode("light")}>
                light
              </LinkText>
              <LinkText color="orange" onPress={() => setMode("dark")}>
                dark
              </LinkText>
              <LinkText color="orange" onPress={() => setMode("system")}>
                system
              </LinkText>
            </Flex>
            {story()}
          </Flex>
        </Theme>
      </SafeAreaProvider>
    </ScreenDimensionsProvider>
  )
}

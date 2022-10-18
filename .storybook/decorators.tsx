import { DecoratorFunction } from "@storybook/addons"
import { useEffect, useState } from "react"
import { Appearance } from "react-native"
import { Flex, LinkText, Text, Theme } from "../lib"

export const withDarkModeSwitcher: DecoratorFunction<React.ReactNode> = (story) => {
  const [mode, setMode] = useState<"light" | "dark" | "system">("system")
  const [systemMode, setSystemMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme }) => void setSystemMode(colorScheme ?? "light")
    )
    return () => subscription.remove()
  }, [])

  const isDarkMode = mode === "dark" || (mode === "system" && systemMode === "dark")
  const theme = isDarkMode ? "v5dark" : "v5light"

  return (
    <Theme theme={theme}>
      <Flex flex={1}>
        <Flex flexDirection="row" justifyContent="space-around">
          <Text color="orange">Dark mode: {mode}</Text>
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
  )
}

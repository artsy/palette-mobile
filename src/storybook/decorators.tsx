import { DecoratorFunction } from "@storybook/addons"
import React, { ReactNode, useEffect, useState } from "react"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAtom } from "jotai"
import { Appearance } from "react-native"
import { Flex, Theme, Text, LinkText } from "../../lib"

export const withTheme = (Story) => (
  <Theme theme="v5light">
    <Text color="red">aaww</Text>
    <Story />
  </Theme>
)

const atomStorage = createJSONStorage<any>(() => AsyncStorage)
const atomWithAsyncStorage = <T,>(key: string, initialValue: any) =>
  atomWithStorage<T>(key, initialValue, {
    ...atomStorage,
    delayInit: true,
  })

const modeAtom = atomWithAsyncStorage<"light" | "dark" | "system">("dark-mode-mode", "system")

export const withDarkModeSwitcher: DecoratorFunction<ReactNode> = (story) => {
  const [mode, setMode] = useAtom(modeAtom)
  const [systemMode, setSystemMode] = useState<"light" | "dark">(
    Appearance.getColorScheme() ?? "light"
  )

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
  )
}

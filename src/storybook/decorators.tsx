import AsyncStorage from "@react-native-async-storage/async-storage"
import { DecoratorFunction } from "@storybook/addons"
import { useAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { ReactNode, useEffect, useState } from "react"
import { Appearance, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Flex, Theme, Text, LinkText, Join, Spacer } from ".."

export const withTheme: DecoratorFunction<ReactNode> = (story) => (
  <Theme theme="v3light">
    <Text color="red">aaww</Text>
    {story()}
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
  const saInsets = useSafeAreaInsets()
  const [mode, setMode] = useAtom(modeAtom)
  const [systemMode, setSystemMode] = useState<"light" | "dark">(
    Appearance.getColorScheme() ?? "light"
  )
  const [showDarkModeSwitcher, setShowDarkModeSwitcher] = useState(false)

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme }) => void setSystemMode(colorScheme ?? "light")
    )
    return () => subscription.remove()
  }, [])

  const isDarkMode = mode === "dark" || (mode === "system" && systemMode === "dark")
  const theme = isDarkMode ? "v3dark" : "v3light"

  return (
    <Theme theme={theme}>
      {story()}
      <Flex
        position="absolute"
        top={saInsets.top + 50}
        right={0}
        width={showDarkModeSwitcher ? "100%" : 50}
        backgroundColor={showDarkModeSwitcher ? "background" : "transparent"}
        borderWidth={1}
        borderColor={showDarkModeSwitcher ? "black60" : "transparent"}
      >
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center" height="30px">
          {showDarkModeSwitcher && (
            <Join separator={<Spacer x={1} />}>
              <Text color="orange">
                Dark mode: {mode} {mode === "system" && "(" + systemMode + ")"}
              </Text>
              <LinkText color="orange" onPress={() => void setMode("light")}>
                light
              </LinkText>
              <LinkText color="orange" onPress={() => void setMode("dark")}>
                dark
              </LinkText>
              <LinkText color="orange" onPress={() => void setMode("system")}>
                system
              </LinkText>
            </Join>
          )}
          <Pressable onPress={() => setShowDarkModeSwitcher((v) => !v)}>
            <Flex width={12} height={12} borderWidth={1} borderColor="black60" mx={1} />
          </Pressable>
        </Flex>
      </Flex>
    </Theme>
  )
}

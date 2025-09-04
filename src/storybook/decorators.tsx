import AsyncStorage from "@react-native-async-storage/async-storage"
import { DecoratorFunction } from "@storybook/addons"
import { useAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { MotiView } from "moti"
import { ReactNode, useEffect, useState } from "react"
import { Appearance } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Theme } from "../Theme"
import { Switch } from "../elements"
import { Flex } from "../elements/Flex"
import { LinkText, Text } from "../elements/Text"
import { ScreenDimensionsProvider, useColor } from "../utils/hooks"

export const withTheme: DecoratorFunction<ReactNode> = (story) => (
  <Theme theme="v3light">{story()}</Theme>
)

const atomStorage = createJSONStorage<any>(() => AsyncStorage)
const atomWithAsyncStorage = <T,>(key: string, initialValue: any) =>
  atomWithStorage<T>(key, initialValue, {
    ...atomStorage,
    delayInit: true,
  })

const modeAtom = atomWithAsyncStorage<"light" | "dark" | "system">("dark-mode-mode", "system")

export const useTheme: DecoratorFunction<React.ReactNode> = (story) => <Theme>{story()}</Theme>

export const useDarkModeSwitcher: DecoratorFunction<ReactNode> = (story) => {
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
  const theme = isDarkMode ? "v3dark" : "v3light"

  return (
    <ScreenDimensionsProvider>
      <SafeAreaProvider>
        <Theme theme={theme}>
          <Flex flex={1} backgroundColor="background">
            <DarkModeSwitcher isDarkMode={isDarkMode} setMode={setMode} />
            {story()}
          </Flex>
        </Theme>
      </SafeAreaProvider>
    </ScreenDimensionsProvider>
  )
}

const DarkModeSwitcher: React.FC<{
  isDarkMode: boolean
  setMode: (mode: "light" | "dark" | "system") => void
}> = ({ isDarkMode, setMode }) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-end"
      width="100%"
      backgroundColor="#333333"
      py={1}
      px={2}
    >
      <Flex flexDirection="row" alignItems="center" gap={2}>
        <Text color="white">Enable Dark mode 🌙:</Text>
        <Switch value={isDarkMode} onValueChange={() => setMode(isDarkMode ? "light" : "dark")} />
      </Flex>
    </Flex>
  )
}

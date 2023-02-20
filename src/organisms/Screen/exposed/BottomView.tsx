import { useEffect, useState } from "react"
import { EmitterSubscription, Keyboard } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SCREEN_HORIZONTAL_PADDING } from "./Body"
import { Flex } from "../../../elements/Flex"
import { useTheme } from "../../../utils/hooks"
import { useScreenBottomViewHeightSetter } from "../atoms"

export const BottomView = ({ children }: { children: React.ReactNode }) => {
  const setBottomViewHeight = useScreenBottomViewHeightSetter()
  const insets = useSafeAreaInsets()
  const { color, id: themeId } = useTheme()
  const isDarkMode = themeId.includes("dark")

  const [keyboardShowing, keyboardHeight] = useKeyboard()

  return (
    <Flex
      position="absolute"
      bottom={keyboardShowing ? keyboardHeight - insets.bottom : 0}
      left={0}
      right={0}
      onLayout={(evt) => void setBottomViewHeight(evt.nativeEvent.layout.height)}
    >
      <LinearGradient
        colors={[isDarkMode ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)", color("background")]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          width: "100%",
          height: 20,
        }}
        pointerEvents="none"
      />
      <Flex
        px={SCREEN_HORIZONTAL_PADDING}
        pt={1}
        pb={keyboardShowing ? 1 : undefined}
        backgroundColor="background"
      >
        {children}
      </Flex>

      {keyboardShowing ? null : <SafeBottomPadding />}
    </Flex>
  )
}
BottomView.defaultProps = { __TYPE: "screen:bottom-view" }

/**
 * If there is a bottom safe area, this will render nothing.
 * If there is no bottom safe area, this will render a small padding.
 *
 * This is useful for texts/buttons that are at the bottom, and with safe area they seem like they
 * have enough space underneath, but with no safe area they look stuck at the bottom.
 */
export const SafeBottomPadding = () => {
  const insets = useSafeAreaInsets()
  if (insets.bottom > 0) return null

  return <Spacer y={2} />
}

const useKeyboard = (): [keyboardShowing: boolean, keyboardHeight: number] => {
  const [keyboardShowing, setKeyboardShowing] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  useEffect(() => {
    const listeners: EmitterSubscription[] = []
    listeners.push(
      Keyboard.addListener(
        "keyboardWillShow", // ios only event
        (e) => {
          setKeyboardHeight(e.endCoordinates.height)
          setKeyboardShowing(true)
        }
      )
    )
    listeners.push(
      Keyboard.addListener(
        "keyboardDidShow", // android event
        (e) => {
          setKeyboardHeight(e.endCoordinates.height)
          setKeyboardShowing(true)
        }
      )
    )
    listeners.push(
      Keyboard.addListener(
        "keyboardWillHide", // ios only event
        () => setKeyboardShowing(false)
      )
    )
    listeners.push(
      Keyboard.addListener(
        "keyboardDidHide", // android event
        () => setKeyboardShowing(false)
      )
    )
    return () => {
      listeners.map((l) => l.remove())
    }
  }, [])

  return [keyboardShowing, keyboardHeight]
}

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import {
  getChildByType,
  getChildrenByType,
  getChildrenByTypeDeep,
  removeChildrenByType,
} from "react-nanny"
import { EmitterSubscription, Keyboard, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SpacingUnitDSValueNumber } from "../../types"
import { Wrap } from "../../utils/Wrap"
import { ArtsyKeyboardAvoidingView } from "../ArtsyKeyboardAvoidingView"
import { BackButton, BackButtonWithBackground } from "../BackButton"
import { Flex, FlexProps } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

interface ScreenContextState {
  handleTopSafeArea: boolean
  bottomViewHeight: number
}

interface ScreenContextValue {
  options: ScreenContextState
  setOptions: (opts: Partial<ScreenContextState>) => void
}

const ScreenContext = createContext<ScreenContextValue>(null!)
function useScreenContext() {
  const context = useContext(ScreenContext)
  if (!context) {
    throw new Error("useScreenContext must be used within a Screen")
  }
  return context
}

const ScreenWrapper = ({ children }: { children?: React.ReactNode }) => {
  const [options, setStateOptions] = useState<ScreenContextState>({
    handleTopSafeArea: true,
    bottomViewHeight: 0,
  })
  return (
    <ScreenContext.Provider
      value={{
        options,
        setOptions: (opts) => setStateOptions((prevOpts) => ({ ...prevOpts, ...opts })),
      }}
    >
      <ScreenRoot>{children}</ScreenRoot>
    </ScreenContext.Provider>
  )
}

const ScreenRoot = ({ children }: { children?: React.ReactNode }) => {
  const header = getChildByType(children, LegacyScreen.Header)
  const headerFloating = getChildByType(children, LegacyScreen.FloatingHeader)
  const background = getChildByType(children, LegacyScreen.Background)
  const bodyChildren = getChildrenByTypeDeep(children, LegacyScreen.Body)

  return (
    <Flex flex={1} backgroundColor="mono0">
      {background /* fullscreen */}

      {header}
      {bodyChildren}

      {headerFloating /* floating, so keep close to the bottom */}
    </Flex>
  )
}

const useUpdateScreenContext = ({ header }: { header: "none" | "regular" | "floating" }) => {
  const { setOptions } = useScreenContext()

  useEffect(
    () => void setOptions({ handleTopSafeArea: header === "none" || header === "floating" }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [header]
  )
}

const NAVBAR_HEIGHT = 44

interface HeaderProps {
  onBack?: () => void
  title?: string
  onSkip?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onBack, title, onSkip }) => {
  useUpdateScreenContext({ header: "regular" })
  const insets = useSafeAreaInsets()

  return (
    <Flex
      mt={`${insets.top}px`}
      height={NAVBAR_HEIGHT}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px={SCREEN_HORIZONTAL_PADDING}
    >
      <Flex>
        {!!onBack && (
          <BackButton
            onPress={onBack}
            style={{ flex: 1, justifyContent: "center" }}
            hitSlop={{ left: 20, right: 20 }}
          />
        )}
      </Flex>
      {!!title && <Text>{title}</Text>}
      {!!onSkip && (
        <Touchable haptic="impactLight" onPress={onSkip}>
          <Flex height="100%" justifyContent="center">
            <Text textAlign="right" variant="xs">
              Skip
            </Text>
          </Flex>
        </Touchable>
      )}
    </Flex>
  )
}

/**
 * @deprecated Use `Screen.Header` instead.
 */
export const FloatingHeader: React.FC<HeaderProps> = ({ onBack }) => {
  useUpdateScreenContext({ header: "floating" })
  const insets = useSafeAreaInsets()

  if (onBack) {
    return (
      <Flex
        position="absolute"
        top={insets.top}
        left={0}
        right={0}
        height={NAVBAR_HEIGHT}
        px={1}
        flexDirection="row"
        alignItems="center"
      >
        <BackButtonWithBackground onPress={onBack} />
      </Flex>
    )
  }
  return null
}

const SCREEN_HORIZONTAL_PADDING: SpacingUnitDSValueNumber = 2

interface BodyProps extends Pick<FlexProps, "backgroundColor"> {
  children?: React.ReactNode
  scroll?: boolean
  noTopSafe?: boolean
  noBottomSafe?: boolean
  fullwidth?: boolean
}

const Body = ({
  scroll = false,
  noTopSafe = false,
  noBottomSafe = false,
  fullwidth = false,
  children,
  ...restFlexProps
}: BodyProps) => {
  const childrenExceptBottomView = removeChildrenByType(children, LegacyScreen.BottomView)
  const bottomView = getChildrenByType(children, LegacyScreen.BottomView)
  const { options } = useScreenContext()
  const insets = useSafeAreaInsets()
  const withTopSafeArea = options.handleTopSafeArea && !noTopSafe
  const withBottomSafeArea = !noBottomSafe

  return (
    <>
      <Flex
        flex={1}
        mt={withTopSafeArea ? `${insets.top}px` : undefined}
        mb={withBottomSafeArea ? `${insets.bottom}px` : undefined}
        {...restFlexProps}
      >
        <Wrap if={scroll}>
          <ArtsyKeyboardAvoidingView>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentInset={{ bottom: options.bottomViewHeight - insets.bottom }}
            >
              <Wrap.Content>
                <Flex flex={1} px={fullwidth ? undefined : SCREEN_HORIZONTAL_PADDING}>
                  {childrenExceptBottomView}
                </Flex>
              </Wrap.Content>
            </ScrollView>
            {bottomView}
          </ArtsyKeyboardAvoidingView>
        </Wrap>
      </Flex>
    </>
  )
}

const Background: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Flex position="absolute" top={0} bottom={0} left={0} right={0}>
    {children}
  </Flex>
)

const BottomView: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { setOptions } = useScreenContext()
  const insets = useSafeAreaInsets()

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

  return (
    <Flex
      position="absolute"
      bottom={keyboardShowing ? keyboardHeight - insets.bottom : 0}
      left={0}
      right={0}
      onLayout={(evt) => void setOptions({ bottomViewHeight: evt.nativeEvent.layout.height })}
    >
      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          width: "100%",
          height: 30,
        }}
        pointerEvents="none"
      />
      <Flex
        px={SCREEN_HORIZONTAL_PADDING}
        py={keyboardShowing ? 1 : undefined}
        backgroundColor="mono0"
      >
        {children}
      </Flex>

      {keyboardShowing ? null : <SafeBottomPadding />}
    </Flex>
  )
}

/**
 * Only use with `<Screen.Body fullwidth>`.
 * It's basically an easy way to get the right padding when you also need the fullwidth body.
 * One use case might be if you need to put an image background or something in the body,
 * but you also need some content with the right padding.
 */
const BodyXPadding: React.FC<FlexProps> = (props) => (
  <Flex px={SCREEN_HORIZONTAL_PADDING} {...props} />
)

/**
 * If there is a bottom safe area, this will render nothing.
 * If there is no bottom safe area, this will render a small padding.
 *
 * This is useful for texts/buttons that are at the bottom, and with safe area they seem like they
 * have enough space underneath, but with no safe area they look stuck at the bottom.
 */
const SafeBottomPadding = () => {
  const insets = useSafeAreaInsets()
  if (insets.bottom > 0) {
    return null
  }

  return <Spacer y={2} />
}

export const LegacyScreen = Object.assign(ScreenWrapper, {
  Body,
  Header,
  FloatingHeader,
  Background,
  BottomView,
  BodyXPadding,
  SafeBottomPadding,
})

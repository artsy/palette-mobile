import { Component, createRef, useContext, createContext } from "react"
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  LayoutRectangle,
  StatusBar,
  Platform,
  StyleSheet,
  View,
  ViewProps,
} from "react-native"

interface State {
  bottom: number
}

export const ArtsyKeyboardAvoidingViewContext = createContext({
  isPresentedModally: false,
  isVisible: true,
  /**
   * bottom offset is used when the screen is presented modally to account for
   * any extra padding at the bottom of the screen (i.e. added for safe area insets)
   */
  bottomOffset: 0,
})

export const ArtsyKeyboardAvoidingView = ({ children }: { children: React.ReactNode }) => {
  const { isPresentedModally, isVisible, bottomOffset } = useContext(
    ArtsyKeyboardAvoidingViewContext
  )

  return (
    <KeyboardAvoidingView
      enabled={isVisible}
      mode={isPresentedModally ? "bottom-based" : "top-based"}
      bottomOffset={bottomOffset}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

/**
 * This code was mostly copied directly from 'react-native'
 *
 * The things we've changed are:
 * - to allow for bottom-based keyboard height calculations for modals
 * - to use measureInWindow to get the view offset, rather than the bounding box from onLayout
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of https://github.com/facebook/react-native
 */
class KeyboardAvoidingView extends Component<
  { enabled?: boolean; mode: "top-based" | "bottom-based"; bottomOffset: number } & ViewProps,
  State
> {
  _frame: LayoutRectangle | null = null
  _subscriptions: Array<{ remove(): void }> = []
  _initialFrameHeight = 0

  viewRef = createRef<View>()

  constructor(props: any) {
    super(props)
    this.state = { bottom: 0 }
  }

  _relativeKeyboardHeight(keyboardFrame: KeyboardEvent["endCoordinates"]): number {
    const frame = this._frame
    if (!frame || !keyboardFrame) {
      return 0
    }

    switch (this.props.mode) {
      case "top-based": {
        let keyboardY = keyboardFrame.screenY
        // on android the View layout frame coords start at -statusBarHeight but the
        // keyboard screenY starts at 0 so we need to offset it to match the View frame
        if (Platform.OS === "android") {
          keyboardY -= StatusBar.currentHeight ?? 0
        }

        // Calculate the displacement needed for the view such that it
        // no longer overlaps with the keyboard
        return Math.max(frame.y + frame.height - keyboardY, 0)
      }
      case "bottom-based": {
        let keyboardHeight = Dimensions.get("screen").height - keyboardFrame.screenY

        keyboardHeight -= this.props.bottomOffset

        return Math.max(keyboardHeight, 0)
      }
    }
  }

  _onKeyboardChange = (event: KeyboardEvent) => {
    if (event == null) {
      this.setState({ bottom: 0 })
      return
    }

    const { duration, easing, endCoordinates } = event
    const height = this._relativeKeyboardHeight(endCoordinates)

    if (this.state.bottom === height) {
      return
    }

    if (duration && easing) {
      LayoutAnimation.configureNext({
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing] || "keyboard",
        },
      })
    }
    this.setState({ bottom: height })
  }

  _onLayout: ViewProps["onLayout"] = (event) => {
    this._frame = event.nativeEvent.layout
    this.viewRef.current?.measureInWindow((x, y) => {
      this._frame!.x = x
      this._frame!.y = y
    })
    if (!this._initialFrameHeight) {
      // save the initial frame height, before the keyboard is visible
      this._initialFrameHeight = this._frame.height
    }
  }

  componentDidMount(): void {
    if (Platform.OS === "ios") {
      this._subscriptions = [
        Keyboard.addListener("keyboardWillChangeFrame", this._onKeyboardChange),
      ]
    } else {
      this._subscriptions = [
        Keyboard.addListener("keyboardDidHide", this._onKeyboardChange),
        Keyboard.addListener("keyboardDidShow", this._onKeyboardChange),
      ]
    }
  }

  componentWillUnmount(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.remove()
    })
  }

  render() {
    const { children, mode, enabled, style, ...props } = this.props
    const bottomHeight = enabled ? this.state.bottom : 0
    return (
      <View
        ref={this.viewRef}
        style={StyleSheet.compose(style, { paddingBottom: bottomHeight })}
        onLayout={this._onLayout}
        {...props}
      >
        {children}
      </View>
    )
  }
}

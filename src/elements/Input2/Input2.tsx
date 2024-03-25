import { EventEmitter } from "events"

import { THEME } from "@artsy/palette-tokens"
import themeGet from "@styled-system/theme-get"
import {
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import {
  LayoutAnimation,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
} from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import styled from "styled-components"
import { EyeClosedIcon, EyeOpenedIcon, TriangleDown, XCircleIcon } from "../../svgs"
import { useColor, useSpace } from "../../utils/hooks"
import { useMeasure } from "../../utils/hooks/useMeasure"
import { Flex } from "../Flex"
import { Spinner } from "../Spinner"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

export const input2Events = new EventEmitter()

export const emitInput2ClearEvent = () => {
  input2Events.emit("clear")
}

export interface Input2Props extends TextInputProps {
  addClearListener?: boolean
  enableClearButton?: boolean
  error?: string
  fixedRightPlaceholder?: string
  hintText?: string
  icon?: JSX.Element
  loading?: boolean
  onClear?(): void
  onHintPress?: () => void
  onSelectTap?: () => void
  optional?: boolean
  required?: boolean
  showLimit?: boolean
  selectDisplayLabel?: string | undefined | null
  title?: string
  unit?: string | undefined | null
}

export const HORIZONTAL_PADDING = 15
export const INPUT_BORDER_RADIUS = 4
export const INPUT_MIN_HEIGHT = 56
export const MULTILINE_INPUT_MIN_HEIGHT = 110
export const LABEL_HEIGHT = 25

export interface Input2Ref {
  focus: () => void
  blur: () => void
  clear: () => void
}

export const Input2 = forwardRef<Input2Ref, Input2Props>(
  (
    {
      addClearListener = false,
      defaultValue,
      editable = true,
      enableClearButton = false,
      fixedRightPlaceholder,
      hintText = "What's this?",
      icon,
      loading = false,
      onBlur,
      onChangeText,
      onClear,
      onFocus,
      onSelectTap,
      placeholder,
      secureTextEntry = false,
      unit,
      value: propValue,
      selectDisplayLabel,
      ...props
    },
    ref
  ) => {
    const space = useSpace()
    const color = useColor()

    const [focused, setIsFocused] = useState(false)
    const [delayedFocused, setDelayedFocused] = useState(false)
    const [value, setValue] = useState(propValue ?? defaultValue ?? "")

    const [showPassword, setShowPassword] = useState(!secureTextEntry)

    const leftComponentRef = useRef(null)
    const rightComponentRef = useRef(null)
    const inputRef = useRef<TextInput>()

    const variant: InputVariant = getInputVariant({
      hasError: !!props.error,
      editable: editable,
    })

    const hasLeftComponent = !!unit || !!icon || !!onSelectTap

    const animatedState = useSharedValue<InputState>(getInputState({ isFocused: !!focused, value }))

    useImperativeHandle(ref, () => inputRef.current as Input2Ref)

    const fontFamily = THEME.fonts.sans

    useEffect(() => {
      /* to make the font work for secure text inputs,
      see https://github.com/facebook/react-native/issues/30123#issuecomment-711076098 */
      inputRef.current?.setNativeProps({
        style: { fontFamily },
      })
    }, [fontFamily])

    useEffect(() => {
      // We don't need to delay hiding the placeholder
      if (!focused && delayedFocused) {
        setDelayedFocused(false)
      }

      let delayFocusedTimeout: NodeJS.Timeout

      // We only want to show the placeholder after we're sure the title animation has finished
      if (!delayedFocused && focused) {
        delayFocusedTimeout = setTimeout(() => {
          setDelayedFocused(focused)
        }, 200)
      }

      return () => {
        if (delayFocusedTimeout) {
          clearTimeout(delayFocusedTimeout)
        }
      }
    }, [focused, delayedFocused])

    useEffect(() => {
      if (!addClearListener) {
        return
      }

      input2Events.addListener("clear", handleClear)

      return () => {
        input2Events.removeListener("clear", handleClear)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addClearListener])

    const { width: leftComponentWidth = 0 } = useMeasure({
      ref: leftComponentRef,
      extraDeps: unit ? [unit] : [],
    })

    const { width: rightComponentWidth = 0 } = useMeasure({ ref: rightComponentRef })

    const handleChangeText = useCallback(
      (text: string) => {
        setValue(text)
        onChangeText?.(text)
      },
      [onChangeText, setValue]
    )

    const styles = {
      fontFamily: THEME.fonts.sans,
      fontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
      minHeight: props.multiline ? MULTILINE_INPUT_MIN_HEIGHT : INPUT_MIN_HEIGHT,
      borderWidth: 1,
      paddingRight: rightComponentWidth + HORIZONTAL_PADDING,
    }

    const labelStyles = {
      // this is neeeded too make sure the label is on top of the input
      backgroundColor: "white",
      marginRight: space(0.5),
      paddingHorizontal: space(0.5),
      zIndex: 100,
      fontFamily: THEME.fonts.sans,
    }

    animatedState.value = getInputState({ isFocused: !!focused, value })

    const textInputAnimatedStyles = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(INPUT_VARIANTS[variant][animatedState.value].inputBorderColor),
        color: withTiming(INPUT_VARIANTS[variant][animatedState.value].inputTextColor),
        paddingLeft: withTiming(
          hasLeftComponent ? leftComponentWidth + HORIZONTAL_PADDING + 5 : HORIZONTAL_PADDING
        ),
      }
    })

    const labelAnimatedStyles = useAnimatedStyle(() => {
      return {
        color: withTiming(INPUT_VARIANTS[variant][animatedState.value].labelColor),
        top: withTiming(INPUT_VARIANTS[variant][animatedState.value].labelTop),
        fontSize: withTiming(INPUT_VARIANTS[variant][animatedState.value].labelFontSize),
        marginLeft: withTiming(
          hasLeftComponent && !focused && !value
            ? leftComponentWidth + HORIZONTAL_PADDING
            : HORIZONTAL_PADDING
        ),
      }
    })

    const selectComponentStyles = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(INPUT_VARIANTS[variant][animatedState.value].inputBorderColor),
      }
    })

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleClear = useCallback(() => {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut, duration: 200 })
      inputRef.current?.clear()
      handleChangeText("")
      onClear?.()
    }, [onClear, handleChangeText])

    const hasTitle = !!props.title

    const renderLeftComponent = useCallback(() => {
      if (unit) {
        return (
          <Flex
            flexDirection="row"
            position="absolute"
            left={`${HORIZONTAL_PADDING}px`}
            top={43}
            ref={leftComponentRef}
            zIndex={40}
            justifyContent="center"
            alignItems="center"
          >
            <Text color={editable ? "black60" : "black30"} variant="sm-display">
              {unit}
            </Text>
          </Flex>
        )
      }

      if (icon) {
        return (
          <Flex
            position="absolute"
            left={HORIZONTAL_PADDING}
            justifyContent="center"
            alignItems="center"
            height={INPUT_MIN_HEIGHT}
            ref={leftComponentRef}
            zIndex={100}
          >
            {icon}
          </Flex>
        )
      }

      if (onSelectTap) {
        return (
          <TouchableOpacity onPress={onSelectTap} style={{ position: "absolute", zIndex: 1000 }}>
            <AnimatedFlex
              justifyContent="space-between"
              alignItems="center"
              height={INPUT_MIN_HEIGHT}
              ref={leftComponentRef}
              minWidth={105}
              top={hasTitle ? LABEL_HEIGHT : 0}
              flexDirection="row"
              px={`${HORIZONTAL_PADDING}px`}
              borderRightWidth={1}
              style={selectComponentStyles}
            >
              <Text color={editable ? "black100" : "black30"}>{selectDisplayLabel}</Text>
              <TriangleDown fill="black60" width={10} />
            </AnimatedFlex>
          </TouchableOpacity>
        )
      }

      return null
    }, [unit, icon, onSelectTap, editable, hasTitle, selectComponentStyles, selectDisplayLabel])

    const renderRightComponent = useCallback(() => {
      if (fixedRightPlaceholder) {
        return (
          <Flex
            justifyContent="center"
            position="absolute"
            right={`${HORIZONTAL_PADDING}px`}
            top={hasTitle ? LABEL_HEIGHT : 0}
            height={INPUT_MIN_HEIGHT}
            ref={rightComponentRef}
          >
            <Text color={editable ? "black60" : "black30"}>{fixedRightPlaceholder}</Text>
          </Flex>
        )
      }

      if (loading) {
        return (
          <Flex
            justifyContent="center"
            position="absolute"
            right={`${HORIZONTAL_PADDING}px`}
            top={hasTitle ? LABEL_HEIGHT : 0}
            height={INPUT_MIN_HEIGHT}
            ref={rightComponentRef}
          >
            <Spinner
              size="medium"
              style={{
                right: 0,
                width: 15,
                backgroundColor: color("black60"),
              }}
            />
          </Flex>
        )
      }

      if (enableClearButton && value) {
        return (
          <Flex
            justifyContent="center"
            position="absolute"
            right={`${HORIZONTAL_PADDING}px`}
            top={hasTitle ? LABEL_HEIGHT : 0}
            height={INPUT_MIN_HEIGHT}
            zIndex={100}
            ref={rightComponentRef}
          >
            <Touchable
              haptic="impactMedium"
              onPress={handleClear}
              hitSlop={{ bottom: 40, right: 40, left: 0, top: 40 }}
              accessibilityLabel="Clear input button"
              testID="clear-input-button"
            >
              <XCircleIcon fill="black30" />
            </Touchable>
          </Flex>
        )
      }

      if (secureTextEntry) {
        return (
          <Flex
            justifyContent="center"
            position="absolute"
            right={`${HORIZONTAL_PADDING}px`}
            top={hasTitle ? LABEL_HEIGHT : 0}
            height={INPUT_MIN_HEIGHT}
            zIndex={100}
            ref={rightComponentRef}
          >
            <Touchable
              haptic
              onPress={() => {
                LayoutAnimation.configureNext({
                  ...LayoutAnimation.Presets.easeInEaseOut,
                  duration: 200,
                })
                setShowPassword(!showPassword)
              }}
              accessibilityLabel={showPassword ? "hide password button" : "show password button"}
              hitSlop={{ bottom: 40, right: 40, left: 0, top: 40 }}
            >
              {!showPassword ? <EyeClosedIcon fill="black30" /> : <EyeOpenedIcon fill="black60" />}
            </Touchable>
          </Flex>
        )
      }

      return null
    }, [
      fixedRightPlaceholder,
      loading,
      enableClearButton,
      value,
      secureTextEntry,
      hasTitle,
      editable,
      color,
      handleClear,
      showPassword,
    ])

    return (
      <Flex>
        {!!props.onHintPress && (
          <Touchable onPress={props.onHintPress} haptic="impactLight">
            <Text underline variant="xs" color="black60" textAlign="right" mb={0.5}>
              {hintText}
            </Text>
          </Touchable>
        )}

        {!!props.title && (
          <Flex flexDirection="row" zIndex={100} pointerEvents="none" height={LABEL_HEIGHT}>
            <AnimatedText style={[labelStyles, labelAnimatedStyles]} numberOfLines={1}>
              {props.title}
            </AnimatedText>
          </Flex>
        )}

        {renderLeftComponent()}

        {renderRightComponent()}

        <AnimatedStyledInput
          value={value}
          onChangeText={handleChangeText}
          style={[styles, textInputAnimatedStyles]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          ref={inputRef as RefObject<TextInput>}
          placeholderTextColor={color("black60")}
          placeholder={delayedFocused || !props.title ? placeholder : ""}
          secureTextEntry={!showPassword}
          {...props}
        />

        {/* If an input has an error, we don't need to show "Required" and maxChars per design */}
        {!props.error && (
          <Flex flexDirection="row" justifyContent="space-between">
            {!!props.required || !!props.optional ? (
              <Text color="black60" variant="xs" pl={`${HORIZONTAL_PADDING}px`} mt={0.5}>
                {!!props.required && "* Required"}
                {!!props.optional && "* Optional"}
              </Text>
            ) : (
              // Adding this empty flex to make sure that the maxLength text is always on the right
              <Flex />
            )}
            {!!props.maxLength && !!props.showLimit && (
              <Text color="black60" variant="xs" pr={`${HORIZONTAL_PADDING}px`} mt={0.5}>
                {(value || "").length} / {props.maxLength}
              </Text>
            )}
          </Flex>
        )}

        {!!props.error && (
          <Text color="red100" variant="xs" px={`${HORIZONTAL_PADDING}px`} mt={0.5}>
            {props.error}
          </Text>
        )}
      </Flex>
    )
  }
)

const StyledInput = styled(TextInput)`
  padding: ${HORIZONTAL_PADDING}px;
  font-family: ${themeGet("fonts.sans.regular")};
  border-radius: ${INPUT_BORDER_RADIUS}px;
`

const AnimatedStyledInput = Animated.createAnimatedComponent(StyledInput)
const AnimatedText = Animated.createAnimatedComponent(Text)

const SHRINKED_LABEL_TOP = 13
const EXPANDED_LABEL_TOP = 41

type VariantState = {
  untouched: {
    inputBorderColor: string
    labelFontSize: number
    labelColor: string
    labelTop: number
    inputTextColor: string
  }
  touched: {
    inputBorderColor: string
    labelFontSize: number
    labelColor: string
    labelTop: number
    inputTextColor: string
  }
  focused: {
    inputBorderColor: string
    labelFontSize: number
    labelColor: string
    labelTop: number
    inputTextColor: string
  }
}

const DEFAULT_VARIANT_STATES: VariantState = {
  // Unfocused input with no value
  untouched: {
    inputBorderColor: THEME.colors.black30,
    labelFontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
    labelColor: THEME.colors.black60,
    labelTop: EXPANDED_LABEL_TOP,
    inputTextColor: THEME.colors.black100,
  },
  // Unfocused input with value
  touched: {
    inputBorderColor: THEME.colors.black60,
    labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
    labelColor: THEME.colors.black60,
    labelTop: SHRINKED_LABEL_TOP,
    inputTextColor: THEME.colors.black100,
  },
  // Focused input with or without value
  focused: {
    inputBorderColor: THEME.colors.blue100,
    labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
    labelColor: THEME.colors.blue100,
    labelTop: SHRINKED_LABEL_TOP,
    inputTextColor: THEME.colors.black100,
  },
}

const ERROR_VARIANT_STATES: VariantState = {
  // Unfocused error input with no value
  untouched: {
    inputBorderColor: THEME.colors.red100,
    labelFontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
    labelColor: THEME.colors.red100,
    labelTop: EXPANDED_LABEL_TOP,
    inputTextColor: THEME.colors.black100,
  },
  // Unfocused error input with value
  touched: {
    inputBorderColor: THEME.colors.red100,
    labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
    labelColor: THEME.colors.red100,
    labelTop: SHRINKED_LABEL_TOP,
    inputTextColor: THEME.colors.black100,
  },
  // Focused error input with or without value
  focused: {
    inputBorderColor: THEME.colors.red100,
    labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
    labelColor: THEME.colors.red100,
    labelTop: SHRINKED_LABEL_TOP,
    inputTextColor: THEME.colors.black100,
  },
}

const DISABLED_VARIANT_STATES: VariantState = {
  // Unfocused disabled input with no value
  untouched: {
    inputBorderColor: THEME.colors.black30,
    labelFontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
    labelColor: THEME.colors.black30,
    labelTop: EXPANDED_LABEL_TOP,
    inputTextColor: THEME.colors.black30,
  },
  // Unfocused disabled input with value
  touched: {
    inputBorderColor: THEME.colors.black30,
    labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
    labelColor: THEME.colors.black30,
    labelTop: SHRINKED_LABEL_TOP,
    inputTextColor: THEME.colors.black30,
  },
  // Focused disabled input with or without value
  // Adding this just to satisfy typescript because a disabled input can't be focused
  focused: {
    inputBorderColor: THEME.colors.black30,
    labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
    labelColor: THEME.colors.black30,
    labelTop: SHRINKED_LABEL_TOP,
    inputTextColor: THEME.colors.black30,
  },
}

export const INPUT_VARIANTS = {
  default: DEFAULT_VARIANT_STATES,
  error: ERROR_VARIANT_STATES,
  disabled: DISABLED_VARIANT_STATES,
}

export type InputState = keyof typeof DEFAULT_VARIANT_STATES
export type InputVariant = keyof typeof INPUT_VARIANTS

export const getInputState = ({
  isFocused,
  value,
}: {
  isFocused: boolean
  value: string | undefined
}): InputState => {
  if (isFocused) {
    return "focused"
  } else if (value) {
    return "touched"
  } else {
    return "untouched"
  }
}

export const getInputVariant = ({
  editable,
  hasError,
}: {
  editable: boolean
  hasError: boolean
}) => {
  if (hasError) {
    return "error"
  }
  if (!editable) {
    return "disabled"
  }
  return "default"
}

export type Input2 = TextInput

const AnimatedFlex = Animated.createAnimatedComponent(Flex)

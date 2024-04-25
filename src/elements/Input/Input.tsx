import { EventEmitter } from "events"

import { THEME } from "@artsy/palette-tokens"
import themeGet from "@styled-system/theme-get"
import {
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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
  ViewProps,
} from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import styled from "styled-components"
import { INPUT_VARIANTS, InputState, InputVariant, getInputState, getInputVariant } from "./helpers"
import { EyeClosedIcon, EyeOpenedIcon, TriangleDown, XCircleIcon } from "../../svgs"
import { useTheme } from "../../utils/hooks"
import { useMeasure } from "../../utils/hooks/useMeasure"
import { Flex } from "../Flex"
import { Spinner } from "../Spinner"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

export const inputEvents = new EventEmitter()

export const emitInputClearEvent = () => {
  inputEvents.emit("clear")
}

export interface InputProps extends TextInputProps {
  addClearListener?: boolean
  /**
   * We are applying some optimisations to make sure the UX is smooth
   * These lead to some issues when the parent component wants further control of the value
   */
  disabled?: boolean
  enableClearButton?: boolean
  error?: string
  fixedRightPlaceholder?: string
  hintText?: string
  icon?: JSX.Element
  leftComponentWidth?: number
  loading?: boolean
  onClear?(): void
  onHintPress?: () => void
  onSelectTap?: () => void
  optional?: boolean
  required?: boolean
  selectComponentWidth?: number
  selectDisplayLabel?: string | undefined | null
  showLimit?: boolean
  title?: string
  unit?: string | undefined | null
}

export const HORIZONTAL_PADDING = 15
export const INPUT_BORDER_RADIUS = 4
export const INPUT_MIN_HEIGHT = 56
export const MULTILINE_INPUT_MIN_HEIGHT = 110
export const MULTILINE_INPUT_MAX_HEIGHT = 300
export const LABEL_HEIGHT = 25
export const LEFT_COMPONENT_WIDTH = 40
export const SELECT_COMPONENT_WIDTH = 120

export interface InputRef {
  focus: () => void
  blur: () => void
  clear: () => void
}

export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      addClearListener = false,
      defaultValue,
      disabled = false,
      enableClearButton = false,
      fixedRightPlaceholder,
      hintText = "What's this?",
      icon,
      leftComponentWidth = LEFT_COMPONENT_WIDTH,
      selectComponentWidth = SELECT_COMPONENT_WIDTH,
      loading = false,
      onBlur,
      onChangeText,
      onClear,
      onFocus,
      onSelectTap,
      placeholder,
      secureTextEntry = false,
      style: styleProp = {},
      unit,
      value: propValue,
      selectDisplayLabel,
      ...props
    },
    ref
  ) => {
    const { color, theme, space } = useTheme()

    const [focused, setIsFocused] = useState(false)
    const [delayedFocused, setDelayedFocused] = useState(false)

    const [value, setValue] = useState(propValue ?? defaultValue)

    const [showPassword, setShowPassword] = useState(!secureTextEntry)

    const rightComponentRef = useRef(null)
    const inputRef = useRef<TextInput>()

    const variant: InputVariant = getInputVariant({
      hasError: !!props.error,
      disabled: disabled,
    })

    const hasLeftComponent = useMemo(
      () => !!unit || !!icon || !!onSelectTap,
      [unit, icon, onSelectTap]
    )

    const animatedState = useSharedValue<InputState>(
      getInputState({
        isFocused: !!focused,
        value: value,
      })
    )

    useImperativeHandle(ref, () => inputRef.current as InputRef)

    useEffect(() => {
      // If the prop value changes, update the local state
      // This optimisation is not needed if no propValue has been specified
      if (propValue !== undefined && propValue !== value) {
        setValue(propValue)
      }
    }, [propValue, value])

    const fontFamily = theme.fonts.sans.regular

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

    const handleChangeText = useCallback(
      (text: string) => {
        setValue(text)
        onChangeText?.(text)
      },
      [onChangeText]
    )

    const handleClear = useCallback(() => {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut, duration: 200 })
      inputRef.current?.clear()
      handleChangeText("")
      onClear?.()
    }, [onClear, handleChangeText])

    useEffect(() => {
      if (!addClearListener) {
        return
      }

      inputEvents.addListener("clear", handleClear)

      return () => {
        inputEvents.removeListener("clear", handleClear)
      }
    }, [addClearListener, handleClear])

    const { width: rightComponentWidth = 0 } = useMeasure({ ref: rightComponentRef })

    const textInputPaddingLeft = useMemo(() => {
      if (!hasLeftComponent) {
        return HORIZONTAL_PADDING
      }

      if (onSelectTap) {
        return selectComponentWidth + HORIZONTAL_PADDING
      }

      return leftComponentWidth
    }, [hasLeftComponent, leftComponentWidth, onSelectTap, selectComponentWidth])

    const styles = {
      fontFamily: fontFamily,
      fontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
      minHeight: props.multiline ? MULTILINE_INPUT_MIN_HEIGHT : INPUT_MIN_HEIGHT,
      maxHeight: props.multiline ? MULTILINE_INPUT_MAX_HEIGHT : undefined,
      height: props.multiline ? MULTILINE_INPUT_MIN_HEIGHT : undefined,
      borderWidth: 1,
      paddingRight: rightComponentWidth + HORIZONTAL_PADDING,
      paddingLeft: textInputPaddingLeft,
      ...(styleProp as {}),
    }

    const labelStyles = useMemo(() => {
      return {
        // this is neeeded too make sure the label is on top of the input
        backgroundColor: "white",
        marginRight: space(0.5),
        zIndex: 100,
        fontFamily: fontFamily,
      }
    }, [fontFamily, space])

    animatedState.value = getInputState({
      isFocused: !!focused,
      value: value,
    })

    const textInputAnimatedStyles = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(INPUT_VARIANTS[variant][animatedState.value].inputBorderColor),
        color: withTiming(INPUT_VARIANTS[variant][animatedState.value].inputTextColor),
      }
    })

    const labelAnimatedStyles = useAnimatedStyle(() => {
      const hasValue = !!value

      // Only add a margin if the input has a left component and it is not focused and has no value
      const marginLeft =
        textInputPaddingLeft && !focused && !hasValue
          ? textInputPaddingLeft - 3
          : HORIZONTAL_PADDING

      return {
        color: withTiming(INPUT_VARIANTS[variant][animatedState.value].labelColor),
        top: withTiming(INPUT_VARIANTS[variant][animatedState.value].labelTop),
        fontSize: withTiming(INPUT_VARIANTS[variant][animatedState.value].labelFontSize),
        marginLeft: withTiming(marginLeft),
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

    const hasTitle = !!props.title

    const renderLeftComponent = useCallback(() => {
      const leftComponentSharedStyles: ViewProps["style"] = {
        position: "absolute",
        paddingHorizontal: HORIZONTAL_PADDING,
        height: INPUT_MIN_HEIGHT,
        top: hasTitle ? LABEL_HEIGHT : 0,
        alignItems: "center",
        zIndex: 100,
      }

      if (unit || icon) {
        return (
          <Flex
            style={{
              ...leftComponentSharedStyles,
              justifyContent: "center",
              width: leftComponentWidth,
            }}
          >
            {unit && (
              <Text color={disabled ? "black30" : "black60"} variant="sm-display">
                {unit}
              </Text>
            )}
            {icon}
          </Flex>
        )
      }

      if (onSelectTap) {
        return (
          <TouchableOpacity
            onPress={onSelectTap}
            style={{ position: "absolute" }}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <AnimatedFlex
              style={[
                {
                  ...leftComponentSharedStyles,
                  width: selectComponentWidth,
                  flexDirection: "row",
                  borderRightWidth: 1,
                  justifyContent: "space-between",
                },
                selectComponentStyles,
              ]}
            >
              <Text color={disabled ? "black30" : "black100"}>{selectDisplayLabel}</Text>
              <TriangleDown fill="black60" width={10} />
            </AnimatedFlex>
          </TouchableOpacity>
        )
      }

      return null
    }, [
      hasTitle,
      unit,
      icon,
      onSelectTap,
      leftComponentWidth,
      disabled,
      selectComponentWidth,
      selectComponentStyles,
      selectDisplayLabel,
    ])

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
            <Text color={disabled ? "black30" : "black60"}>{fixedRightPlaceholder}</Text>
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
      disabled,
      color,
      handleClear,
      showPassword,
    ])

    const renderBottomComponent = useCallback(() => {
      if (!!props.error) {
        return (
          <Text color="red100" variant="xs" px={`${HORIZONTAL_PADDING}px`} mt={0.5}>
            {props.error}
          </Text>
        )
      }

      return (
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
      )
    }, [props.error, props.maxLength, props.optional, props.required, props.showLimit, value])

    const renderHint = useCallback(() => {
      if (!props.onHintPress) {
        return null
      }

      return (
        <Flex
          style={{
            alignItems: "flex-end",
            top: space(2),
          }}
        >
          <Touchable
            onPress={props.onHintPress}
            haptic="impactLight"
            hitSlop={{
              top: 5,
              right: 10,
              bottom: 5,
              left: 10,
            }}
          >
            <Text underline variant="xs" color="black60">
              {hintText}
            </Text>
          </Touchable>
        </Flex>
      )
    }, [hintText, props.onHintPress, space])

    const getPlaceholder = useCallback(() => {
      // Show placeholder always if there is no title
      // This is because we won't have a title animation
      if (!props.title) {
        return placeholder
      }

      // On blur, we want to show the placeholder immediately
      if (delayedFocused) {
        return placeholder
      }

      // On focus, we want to show the placeholder after the title animation has finished
      return ""
    }, [delayedFocused, props.title, placeholder])

    const renderAnimatedTitle = useCallback(() => {
      if (!props.title) {
        return null
      }

      return (
        <Flex flexDirection="row" zIndex={100} pointerEvents="none" height={LABEL_HEIGHT}>
          <AnimatedText style={[labelStyles, labelAnimatedStyles]} numberOfLines={1}>
            {" "}
            {props.title}{" "}
          </AnimatedText>
        </Flex>
      )
    }, [labelStyles, labelAnimatedStyles, props.title])

    return (
      <Flex flexGrow={1}>
        {renderHint()}

        {renderAnimatedTitle()}

        <AnimatedStyledInput
          value={value}
          onChangeText={handleChangeText}
          style={[styles, textInputAnimatedStyles]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          scrollEnabled={false}
          editable={!disabled}
          textAlignVertical={props.multiline ? "top" : "center"}
          ref={inputRef as RefObject<TextInput>}
          placeholderTextColor={color("black60")}
          placeholder={getPlaceholder()}
          secureTextEntry={!showPassword}
          {...props}
        />

        {renderRightComponent()}

        {renderLeftComponent()}

        {/* Contains error and other data we display below the textinput */}
        {renderBottomComponent()}
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
const AnimatedFlex = Animated.createAnimatedComponent(Flex)

export type Input = TextInput

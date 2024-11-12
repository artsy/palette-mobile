import isArray from "lodash/isArray"
import isString from "lodash/isString"
import { useCallback, useRef, useState } from "react"
import { LayoutAnimation, Platform, TextInput, TextInputProps } from "react-native"
import { ArrowLeftIcon, MagnifyingGlassIcon } from "../../svgs"
import { useColor, useTheme } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

interface RoundSearchInputProps extends Omit<TextInputProps, "placeholder"> {
  onLeftIconPress?: () => void
  /**
   * The placeholder can be an array of string, specifically for android, because of a bug.
   * On ios, the longest string will always be picked, as ios can add ellipsis.
   * On android, the longest string **that fits** will be picked, as android doesn't use ellipsis.
   * The way to use it is to put the longest string first, and the shortest string last.
   *
   * Check `HACKS.md` for more info.
   *
   * @example
   * const placeholders = [
   *   "Wow this is a great and very long placeholder",
   *   "Wow this is a great and long placeholder",
   *   "Wow this is a great placeholder",
   *   "Wow",
   * ]
   * ...
   * <Input
   *   placeholder={placeholders}
   * />
   */
  placeholder?: string | string[]
}
export const RoundSearchInput: React.FC<RoundSearchInputProps> = ({
  value,
  placeholder,
  onLeftIconPress,
  ...rest
}) => {
  const theme = useTheme()
  const ref = useRef<TextInput>(null)
  const [inputWidth, setInputWidth] = useState(0)
  const placeholderWidths = useRef<number[]>([])

  const [isFocused, setIsFocused] = useState(false)
  const color = useColor()

  const getPlaceholder = useCallback(() => {
    if (!placeholder) {
      return ""
    }
    // if it's android and we only have one string, return that string
    if (isString(placeholder)) {
      return placeholder
    }
    // Wait until the input width is known and the placeholder widths are known to avoid flashes
    if (!placeholderWidths.current.length || !inputWidth) {
      return ""
    }
    // otherwise, find a placeholder that has longest width that fits in the inputtext
    const longestFittingStringIndex = placeholderWidths.current.findIndex((placeholderWidth) => {
      return placeholderWidth <= inputWidth
    })
    if (longestFittingStringIndex > -1) {
      return placeholder[longestFittingStringIndex]
    }

    // otherwise just return the shortest placeholder
    return placeholder[placeholder.length - 1]
  }, [inputWidth, placeholder])

  if (value && __DEV__) {
    throw new Error("Avoid controlled inputs and use the defaultValue prop instead")
  }

  const inputStyles = {
    flex: 1,
    height: CONTAINER_HEIGHT,
    fontFamily: theme.theme.fonts.sans.regular,
    fontSize: 16,
  }

  const renderAndroidPlaceholderMeasuringHack = useCallback(() => {
    if (!isArray(placeholder)) {
      return null
    }

    // Do not render the hack if we have already measured the placeholder
    if (placeholderWidths.current.length > 0) {
      return null
    }

    return (
      <Flex
        style={{
          position: "absolute",
          top: -10000, // make sure its off the screen
          width: 10000, // make sure Texts can take as much space as they need
          alignItems: "baseline", // this is to make Texts get the smallest width they can get to fit the text
        }}
      >
        {placeholder.map((placeholderString, index) => (
          <Text
            onLayout={(event) => {
              placeholderWidths.current[index] = event.nativeEvent.layout.width
            }}
            numberOfLines={1}
            style={inputStyles}
          >
            {placeholderString}
          </Text>
        ))}
      </Flex>
    )
  }, [placeholder])

  return (
    <Flex
      flexDirection="row"
      style={{
        height: CONTAINER_HEIGHT,
        paddingRight: CONTAINER_HORIZONTAL_PADDING,
        paddingLeft: 2 * CONTAINER_HORIZONTAL_PADDING + 16,
        borderRadius: CONTAINER_BORDER_RADIUS,
        backgroundColor: color("black5"),
      }}
    >
      {renderAndroidPlaceholderMeasuringHack()}
      <TextInput
        {...rest}
        placeholder={getPlaceholder()}
        ref={ref}
        onLayout={(event) => {
          setInputWidth(event.nativeEvent.layout.width)
        }}
        style={inputStyles}
        autoCapitalize="none"
        blurOnSubmit
        // We only support up to 100 chars search in our backend,
        // anything above that would lead to an error
        maxLength={100}
        clearButtonMode="always"
        placeholderTextColor={color("black60")}
        onFocus={(e) => {
          setIsFocused(true)
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          rest.onFocus?.(e)
        }}
        enterKeyHint="search"
        returnKeyType="search"
      />
      <Flex
        position="absolute"
        height={CONTAINER_HEIGHT}
        justifyContent="center"
        alignItems="center"
        style={{
          paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
        }}
      >
        <Touchable
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            ref.current?.blur()
            setIsFocused(false)
            onLeftIconPress?.()
          }}
          haptic="impactLight"
        >
          {!isFocused ? (
            <MagnifyingGlassIcon
              fill="black60"
              width={ICON_SIZE}
              height={ICON_SIZE}
              style={{
                transform: [
                  {
                    scaleX: -1,
                  },
                ],
              }}
            />
          ) : (
            <ArrowLeftIcon long fill="black60" width={ICON_SIZE} height={ICON_SIZE} />
          )}
        </Touchable>
      </Flex>
    </Flex>
  )
}

const CONTAINER_HEIGHT = 48
const CONTAINER_HORIZONTAL_PADDING = 16
const CONTAINER_BORDER_RADIUS = 24
const ICON_SIZE = 24

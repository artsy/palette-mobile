import { THEME } from "@artsy/palette-tokens"
import { ThemeType, ThemeWithDarkModeType } from "../../tokens"

export const SHRINKED_LABEL_TOP = 13
export const EXPANDED_LABEL_TOP = 40

export type VariantState = {
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

const getDefaultVariantStates = (theme: ThemeType | ThemeWithDarkModeType): VariantState => {
  return {
    // Unfocused input with no value
    untouched: {
      inputBorderColor: theme.colors.mono30,
      labelFontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
      labelColor: theme.colors.mono60,
      labelTop: EXPANDED_LABEL_TOP,
      inputTextColor: theme.colors.mono100,
    },
    // Unfocused input with value
    touched: {
      inputBorderColor: theme.colors.mono60,
      labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
      labelColor: theme.colors.mono60,
      labelTop: SHRINKED_LABEL_TOP,
      inputTextColor: theme.colors.mono100,
    },
    // Focused input with or without value
    focused: {
      inputBorderColor: theme.colors.blue100,
      labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
      labelColor: theme.colors.blue100,
      labelTop: SHRINKED_LABEL_TOP,
      inputTextColor: theme.colors.mono100,
    },
  }
}

const getErrorVariantStates = (theme: ThemeType | ThemeWithDarkModeType): VariantState => {
  return {
    // Unfocused error input with no value
    untouched: {
      inputBorderColor: theme.colors.red100,
      labelFontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
      labelColor: theme.colors.red100,
      labelTop: EXPANDED_LABEL_TOP,
      inputTextColor: theme.colors.mono100,
    },
    // Unfocused error input with value
    touched: {
      inputBorderColor: theme.colors.red100,
      labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
      labelColor: theme.colors.red100,
      labelTop: SHRINKED_LABEL_TOP,
      inputTextColor: theme.colors.mono100,
    },
    // Focused error input with or without value
    focused: {
      inputBorderColor: theme.colors.red100,
      labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
      labelColor: theme.colors.red100,
      labelTop: SHRINKED_LABEL_TOP,
      inputTextColor: theme.colors.mono100,
    },
  }
}

const getDisabledVariantStates = (theme: ThemeType | ThemeWithDarkModeType): VariantState => {
  return {
    // Unfocused disabled input with no value
    untouched: {
      inputBorderColor: theme.colors.mono30,
      labelFontSize: parseInt(THEME.textVariants["sm-display"].fontSize, 10),
      labelColor: theme.colors.mono30,
      labelTop: EXPANDED_LABEL_TOP,
      inputTextColor: theme.colors.mono30,
    },
    // Unfocused disabled input with value
    touched: {
      inputBorderColor: theme.colors.mono30,
      labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
      labelColor: theme.colors.mono30,
      labelTop: SHRINKED_LABEL_TOP,
      inputTextColor: theme.colors.mono30,
    },
    // Focused disabled input with or without value
    // Adding this just to satisfy typescript because a disabled input can't be focused
    focused: {
      inputBorderColor: theme.colors.mono30,
      labelFontSize: parseInt(THEME.textVariants.xs.fontSize, 10),
      labelColor: theme.colors.mono30,
      labelTop: SHRINKED_LABEL_TOP,
      inputTextColor: theme.colors.mono30,
    },
  }
}

export const getInputVariants = (theme: ThemeType | ThemeWithDarkModeType) => {
  return {
    default: getDefaultVariantStates(theme),
    error: getErrorVariantStates(theme),
    disabled: getDisabledVariantStates(theme),
  }
}

export type InputState = keyof ReturnType<typeof getDefaultVariantStates>
export type InputVariant = keyof ReturnType<typeof getInputVariants>

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
  disabled,
  hasError,
}: {
  disabled: boolean
  hasError: boolean
}) => {
  if (hasError) {
    return "error"
  }
  if (disabled) {
    return "disabled"
  }
  return "default"
}

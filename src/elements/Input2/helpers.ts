import { THEME } from "@artsy/palette-tokens"

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

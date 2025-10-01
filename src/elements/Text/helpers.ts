import { TextStyle } from "react-native"
import { useTheme } from "../../utils/hooks/useTheme"
import { NoUndefined } from "../../utils/types"
import { TextProps } from "../Text"

export const useFontFamilyFor = ({
  italic,
  weight,
}: {
  italic: TextProps["italic"]
  weight: TextProps["weight"]
}) => {
  const { theme } = useTheme()
  const { fonts } = theme

  if (italic && weight === "medium") {
    return fonts.sans.mediumItalic
  }

  if (italic) {
    return fonts.sans.italic
  }

  if (weight === "medium") {
    return fonts.sans.medium
  }

  return fonts.sans.regular
}

export const useTextStyleForPalette = (variant: NoUndefined<TextProps["variant"]>): TextStyle => {
  const { theme } = useTheme()

  const fontSizeAndLineHeight = theme.textTreatments[variant].fontSize

  return {
    fontSize: fontSizeAndLineHeight,
    lineHeight: fontSizeAndLineHeight,
  }
}

import { THEME } from "@artsy/palette-tokens"
import { StyleSheet } from "react-native"

export const shadows = StyleSheet.create({
  DROP_SHADOW: {
    shadowColor: THEME.colors["black100"],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
})

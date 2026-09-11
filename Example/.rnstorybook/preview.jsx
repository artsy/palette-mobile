// @ts-expect-error
import { useDarkModeSwitcher } from "../../src/storybook/decorators"

export const decorators = [useDarkModeSwitcher]
export const parameters = {}

/** @type{import("@storybook/react-native").Preview} */
const preview = {
  parameters,

  decorators,
}

export default preview

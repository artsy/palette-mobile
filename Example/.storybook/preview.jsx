// @ts-expect-error
import { useDarkModeSwitcher } from "../../src/storybook/decorators"

export const decorators = [useDarkModeSwitcher]
export const parameters = {}

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters,

  decorators,
}

export default preview

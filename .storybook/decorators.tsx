import { DecoratorFunction } from "@storybook/addons"
import { Theme } from "../lib"

export const withTheme: DecoratorFunction<React.ReactNode> = (story) => <Theme>{story()}</Theme>

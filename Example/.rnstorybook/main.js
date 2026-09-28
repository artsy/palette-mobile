/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  stories: ["../../src/**/*.stories.?(ts|tsx|js|jsx)"],
  deviceAddons: ["@storybook/addon-ondevice-controls", "@storybook/addon-ondevice-actions"],
}

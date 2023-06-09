/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

const getStories = () => {
  return [
    require("../src/elements/Avatar/Avatar.stories.tsx"),
    require("../src/elements/BackButton/BackButton.stories.tsx"),
    require("../src/elements/Box/Box.stories.tsx"),
    require("../src/elements/ButtonNew/Button.stories.tsx"),
    require("../src/elements/Checkbox/Checkbox.stories.tsx"),
    require("../src/elements/Collapse/Collapse.stories.tsx"),
    require("../src/elements/CollapsibleMenuItem/CollapsibleMenuItem.stories.tsx"),
    require("../src/elements/Dialog/Dialog.stories.tsx"),
    require("../src/elements/Input/Input.stories.tsx"),
    require("../src/elements/List/List.stories.tsx"),
    require("../src/elements/MenuItem/MenuItem.stories.tsx"),
    require("../src/elements/Message/Message.stories.tsx"),
    require("../src/elements/ProgressBar/ProgressBar.stories.tsx"),
    require("../src/elements/Screen/Screen.stories.tsx"),
    require("../src/elements/Separator/Separator.stories.tsx"),
    require("../src/elements/Skeleton/Skeleton.stories.tsx"),
    require("../src/elements/Spacer/Spacer.stories.tsx"),
    require("../src/elements/Tabs/Tabs.stories.tsx"),
    require("../src/elements/Text/Text.stories.tsx"),
    require("../src/elements/ToolTip/ToolTip.stories.tsx"),
    require("../src/elements/ToolTip/v2/ToolTip.stories.tsx"),
    require("../src/elements/Touchable/Touchable.stories.tsx"),
    require("../src/elements/VisualClue/VisualClue.stories.tsx"),
    require("../src/svgs/icons.stories.tsx"),
    require("../src/utils/colors.stories.tsx"),
    require("../src/utils/space.stories.tsx"),
  ];
};

configure(getStories, module, false);

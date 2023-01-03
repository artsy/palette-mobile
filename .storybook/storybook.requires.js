/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
} from "@storybook/react-native";

import { decorators, parameters } from "./preview";

if (decorators) {
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

const getStories = () => {
  return [
    require("../lib/atoms/BackButton/BackButton.stories.tsx"),
    require("../lib/atoms/Box/Box.stories.tsx"),
    require("../lib/atoms/Spacer/Spacer.stories.tsx"),
    require("../lib/elements/Avatar/Avatar.stories.tsx"),
    require("../lib/elements/Checkbox/Checkbox.stories.tsx"),
    require("../lib/elements/Input/Input.stories.tsx"),
    require("../lib/elements/Skeleton/Skeleton.stories.tsx"),
    require("../lib/elements/Touchable/Touchable.stories.tsx"),
    require("../lib/molecules/MenuItem.stories.tsx"),
    require("../lib/svgs/icons.stories.tsx"),
  ];
};

configure(getStories, module, false);

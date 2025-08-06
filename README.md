# Palette Mobile

# @artsy/palette-mobile [![npm version](https://badge.fury.io/js/%40artsy%2Fpalette-mobile.svg)](https://www.npmjs.com/package/@artsy/palette-mobile) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/artsy/palette-mobile/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/artsy/palette-mobile/tree/main)

Artsy's Design System on Mobile

## Meta

- Point People: [@araujobarret](https://github.com/araujobarret) [@MrSltun](https://github.com/MrSltun)
- Palette for Web: [palette](https://github.com/artsy/palette)

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used across our digital product portfolio.

## Does my component belong in Palette?

If the component applies to Artsy as a brand and can/will be used across multiple digital products, then Palette is a great place for it. If it's highly product specific then it's best to leave the component where it's used. We can always move things later!

## Looking for home view components?

The server-driven home view architecture launched in Eigen (Q4 2024) makes use of a standard library of home view section components.

Those components may make use of palette-mobile primitives, but they are not defined here. Instead they are defined [directly in Eigen](https://github.com/artsy/eigen/tree/main/src/app/Scenes/HomeView/Sections) and documented in [this Notion page](https://www.notion.so/artsy/Home-view-section-reference-150cab0764a0803fb00ed5dc3d860d1f).

If the above guidance still doesn't give you a good sense of what to do, please join the mobile practice meetings.

# How to install

- Install main library

```sh
yarn add @artsy/palette-mobile
```

- Install native peer deps

```sh
yarn add react-native-haptic-feedback react-native-linear-gradient react-native-reanimated react-native-svg
```

## How to contribute

If you'd like to add a new component to Palette please create an issue using the component spec template. That'll give both design and engineering a chance to peek at the proposal and provide feedback before moving forward.

## Local development

Set up using:

```sh
yarn setup:artsy
yarn install:all
```

Run using:

```sh
yarn start
```

And then either open Xcode and run, or Android Studio, or run `yarn ios` or `yarn android` from the command line, or just open up the simulator if you have done this before.

## Developing Features using Local Versions of Palette

When developing new components in Palette, it's often useful to test those components in consuming apps (such as Eigen). However, due to the poor support for symlinks in React Native, this can be difficult. Enter [yalc](https://github.com/wclr/yalc). Yalc is a mini package manager that one can publish to and install from, which makes it easy to test code in realtime from outside of your app.

> Note: [@artsy/palette-mobile](https://github.com/artsy/palette-mobile) uses Storybooks for developing features; work there first! Then, when ready (and if necessary), test your code locally using the flow described below. You can also publish npm canary releases from the palette-mobile repo by attaching a `canary` label to your PR.

### Setup

- Install `yalc` globally:

```sh
yarn global add yalc
```

- Navigate to `palette-mobile` in the terminal and start the watcher:

```sh
cd palette-mobile
yarn local-palette-dev
```

- Navigate back to Eigen and link:

```sh
cd eigen
yarn local-palette-dev
yarn start
```

This will update `package.json` to point at the yalc-published version of palette.

- When done developing your local palette feature, be sure to unlink:

```sh
yarn local-palette-dev:stop
```

## Repos consuming Palette Mobile

- [Eigen](https://github.com/artsy/eigen)
- [Energy](https://github.com/artsy/energy)

You can add this library using `yarn add @artsy/palette-mobile`. _Don't forget to also add all the `peerDependencies` to your project._

For connecting Palette to a locally running version of our mobile apps, see [these docs](https://github.com/artsy/eigen/blob/main/docs/developing_local_palette.md).

## About Artsy

<a href="https://www.artsy.net/">
  <img align="left" src="https://avatars2.githubusercontent.com/u/546231?s=200&v=4"/>
</a>

This project is the work of designers and engineers at [Artsy][footer_website], the
world's leading and largest online art marketplace and platform for discovering art.
One of our core [Engineering Principles][footer_principles] is being [Open
Source by Default][footer_open] which means we strive to share as many details
of our work as possible.

You can learn more about this work from [our blog][footer_blog] and by following
[@ArtsyOpenSource][footer_twitter] or explore our public data by checking out
[our API][footer_api]. If you're interested in a career at Artsy, read through
our [job postings][footer_jobs]!

[footer_website]: https://www.artsy.net/
[footer_principles]: culture/engineering-principles.md
[footer_open]: culture/engineering-principles.md#open-source-by-default
[footer_blog]: https://artsy.github.io/
[footer_twitter]: https://twitter.com/ArtsyOpenSource
[footer_api]: https://developers.artsy.net/
[footer_jobs]: https://www.artsy.net/jobs

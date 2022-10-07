# Palette Mobile
# @artsy/palette-mobile [![npm version](https://badge.fury.io/js/%40artsy%2Fpalette-mobile.svg)](https://www.npmjs.com/package/@artsy/palette-mobile) [![Release](https://github.com/artsy/palette-mobile/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/artsy/palette-mobile/actions/workflows/release.yml)

Artsy's Design System on Mobile

## Meta

- Point People: [@pvinis](https://github.com/pvinis)
- Palette for Web: [palette](https://github.com/artsy/palette)

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used across our digital product portfolio.

## Does my component belong in Palette?

If the component applies to Artsy as a brand and can/will be used across multiple digital products, then Palette is a great place for it. If it's highly product specific then it's best to leave the component where it's used. We can always move things later!

If the above guidance still doesn't give you a good sense of what to do, please join the mobile practice meetings.

## How to contribute

If you'd like to add a new component to Palette please create an issue using the component spec template. That'll give both design and engineering a chance to peek at the proposal and provide feedback before moving forward.

## Local development

Set up using:
```sh
yarn install:all
```

Run using:
```sh
yarn start
```

And then either open Xcode and run, or Android Studio, or run `yarn ios` or `yarn android` from the command line, or just open up the simulator if you have done this before.

## Repos consuming Palette Mobile

- [Eigen](https://github.com/artsy/eigen)
- [Energy](https://github.com/artsy/energy)

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

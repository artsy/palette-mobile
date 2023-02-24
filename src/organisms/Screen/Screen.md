`Screen` is supposed to help us build every kind of screen on energy and eigen.

## Available subcomponents (make sure to check for their props!)

- `Body`, thats the main content wrapper.
- `Background`, an easy way to put a background on your body.
- `BottomView`, this will always render at the bottom of the screen, like a CTA or a footer.
- `BodyXPadding`, this will add horizontal padding to the children. Use it with `<Body fullwidth>`.
- `FullWidthItem`, this will remove the horizontal padding from the children. Use it with `<Body>`.
- `AnimatedTitle*`, these are components that work together to build screens with an animated title on top of the screen.
- `*Header`, different kinds of headers that we can use on screens.
- `*TabsBody`, similar to `Body`, but with a tab bar on top.

## Folder structure

- `exposed` are the subcomponents that are available from `Screen` like `Screen.Body`.
- `notExposed` are the subcomponents that are not available from `Screen`, like the `ActualHeader` which is an internal component that both the `Header` and the `AnimatedTitleHeader` use, for example.

## Implementation

The main bit of this is the `ScreenRoot` component, where we use `react-nanny` to find the right subcomponents and render them in the right order/position. And then in the `index.tsx` file we put them all together so they can be used like `<Screen>` and `<Screen.Body>`.

The `AnimatedTitle*` variety files are using jotai to communicate with each other and sync animations and data.

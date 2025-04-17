# Dark Mode (naming, colors, and tokens)

To add dark mode on palette, we need to add a second layer of names.

Before dark mode, our palette was two layers:

- First layer is the raw color values.
  Things like `#000000` or `#1023D7`.
- Second layer is the names of the colors.
  Things like `mono100` or `blue100`.

With dark mode, we need to add a third layer:

- Third layer is the usage/role of the colors.
  Things like `background` or `brand`, and `onBackground`.

Main names added for now:

- `background` for background.
- `surface` for background of bottom sheet, alerts, etc.
- `primary` for primary button, CTAs, etc.
- `secondary` for secondary button, filter buttons, etc.
- `brand` for anything that is all about the brand.

Main `on` names added for now:

- `onBackgroundHigh` for main text/icons on top of the background, like titles, etc.
- `onBackgroundMedium` for secondary text/icons on top of the background, like subtitles, etc.
- `onBackgroundLow` for least important or disabled text/icons on top of the background, etc.
- `onBackground` (alias for `onBackgroundHigh`)
- `onSurfaceHigh`
- `onSurfaceMedium`
- `onSurfaceLow`
- `onSurface` (alias for `onSurfaceHigh`)
- `onPrimaryHigh`
- `onPrimaryMedium`
- `onPrimaryLow`
- `onSecondaryHigh`
- `onSecondaryMedium`
- `onSecondaryLow`
- `onBrand`

![light mode](/screenshots/light-mode.png)
![dark mode](/screenshots/dark-mode.png)

Inspiration: https://m3.material.io/styles/color/the-color-system/color-roles

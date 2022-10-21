# Migrate from Design System v2 to v3

## Changes

- All `Sans` and `Serif` are removed. See below for how to replace these.
- `Garamond` font is removed. `Unica` is the only font on v3.
- Spacing Units `0.3`, `1.5`, `3`, `5`, `9`, `18` are removed. See below for how to replace these.
- Color `yellow30` is removed.

## Migrating

To quickly find places you would need to do replacements, find the types `SpacingUnitsTheme` and `ColorsTheme` in `node_modules`, and **temporarily** change the first type on these (`SpacingUnit` and `Color` respectively) with `SpacingUnitStrict` and `ColorStrict`. This will cause typescript and your editor to show all the places values that don't exist anymore appear.

### Replace `Sans` and `Serif` with `Text`

`Sans` and `Serif` are removed, and we now only have `Text`. Use the following mapping to replace any `Sans` or `Serif`:

| `Sans` `size` | `Text` `variant` |
| ------------- | ---------------- |
| `0`           | `xs`             |
| `1`           | `xs`             |
| `2`           | `xs`             |
| `3`           | `sm`             |
| `3t`          | `sm`             |
| `4`           | `md`             |
| `4t`          | `md`             |
| `5`           | `md`             |
| `5t`          | `md`             |
| `6`           | `lg`             |
| `8`           | `lg`             |
| `10`          | `xl`             |
| `12`          | `xxl`            |
| `14`          | `xxl`            |
| `16`          | `xxl`            |

| `Serif` `size` | `Text` `variant` |
| -------------- | ---------------- |
| `1`            | `xs`             |
| `2`            | `xs`             |
| `3`            | `sm`             |
| `3t`           | `sm`             |
| `4`            | `md`             |
| `4t`           | `md`             |
| `5`            | `md`             |
| `5t`           | `md`             |
| `6`            | `lg`             |
| `8`            | `lg`             |
| `10`           | `xl`             |
| `12`           | `xxl`            |

| `Serif` `weight` | `Text` `weight` |
| ---------------- | --------------- |
| `semibold`       | `medium`        |

### Replace old Spacing Units

In every margin, padding, and any uses of the `space` function coming from `useSpace` hook must be replaced according to the following mapping:

| Old   | New   |
| ----- | ----- |
| `0.3` | `0.5` |
| `1.5` | `2`   |
| `3`   | `4`   |
| `5`   | `6`   |
| `9`   | `6`   |
| `18`  | `12`  |

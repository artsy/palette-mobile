/**
 * Basically the opposite of `Type | undefined`.
 *
 * It's useful for then we get a type that has `undefined` inside it, and we want to remove it.
 */
export type NoUndefined<T> = T extends undefined ? never : T

// This is some funky typescript to help us flip the type `SpacingUnitDSValueNumber` to negative numbers.
export type Neg<T extends number> = T extends 0
  ? 0
  : `-${T}` extends `${infer U extends number}`
  ? U
  : `${T}` extends `-${infer U extends number}`
  ? U
  : Extract<[1e999, -1e999] | [-1e999, 1e999] | [0, 0], [T, unknown]> extends [T, infer U]
  ? U
  : T

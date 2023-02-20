declare module "" {
  global {
    // This is some funky typescript to help us flip the type `SpacingUnitDSValueNumber` to negative numbers.
    export type Neg<T extends number> = T extends 0
      ? 0
      : `-${T}` extends `${infer U extends number}`
      ? U
      : `${T}` extends `-${infer U extends number}`
      ? U
      : // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      Extract<[1e999, -1e999] | [-1e999, 1e999] | [0, 0], [T, unknown]> extends [T, infer U]
      ? U
      : T
  }
}

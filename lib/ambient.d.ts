declare module "" {
  global {
    const __TEST__: boolean
  }
}

declare function assertNever(val: never): void

// Metro and Jest both provide process.env; declared locally so the library doesn't need Node types.
declare const process: { env: Record<string, string | undefined> }

export const isTestEnvironment = () => {
  return !!process.env.JEST_WORKER_ID
}

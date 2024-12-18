export const isTestEnvironment = () => {
  return !!process.env.JEST_WORKER_ID
}

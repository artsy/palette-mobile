export const isTesting = () => {
  return !!process.env.JEST_WORKER_ID
}

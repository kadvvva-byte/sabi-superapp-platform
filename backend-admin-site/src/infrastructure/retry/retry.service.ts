export interface RetryOptions {
  retries: number
  delay: number
  factor: number
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {

  let attempt = 0
  let delay = options.delay

  while (attempt < options.retries) {
    try {
      return await fn()
    } catch (error) {
      attempt++

      if (attempt >= options.retries) {
        throw error
      }

      await new Promise(res => setTimeout(res, delay))

      // exponential backoff
      delay = delay * options.factor
    }
  }

  throw new Error("Retry failed unexpectedly")
}
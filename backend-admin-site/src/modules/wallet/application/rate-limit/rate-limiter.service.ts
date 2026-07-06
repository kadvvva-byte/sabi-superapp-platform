interface RateLimitRecord {
  count: number
  firstRequest: number
}

export class RateLimiterService {

  private requests: Map<string, RateLimitRecord> = new Map()

  private limit = 10
  private windowMs = 60 * 1000 // 1 minute

  check(key: string): boolean {

    const now = Date.now()
    const record = this.requests.get(key)

    if (!record) {

      this.requests.set(key, {
        count: 1,
        firstRequest: now
      })

      return true
    }

    if (now - record.firstRequest > this.windowMs) {

      this.requests.set(key, {
        count: 1,
        firstRequest: now
      })

      return true
    }

    if (record.count >= this.limit) {
      return false
    }

    record.count++

    return true
  }

}
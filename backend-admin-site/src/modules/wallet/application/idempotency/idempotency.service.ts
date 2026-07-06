export class IdempotencyService {

  private keys: Set<string> = new Set()

  check(key: string): boolean {

    if (this.keys.has(key)) {
      return false
    }

    this.keys.add(key)

    return true
  }

}
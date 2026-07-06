interface CurrencyMeta {
  code: string
  minorUnits: number
}

const currencyMap: Record<string, CurrencyMeta> = {
  USD: { code: "USD", minorUnits: 2 },
  EUR: { code: "EUR", minorUnits: 2 },
  UZS: { code: "UZS", minorUnits: 0 },
  JPY: { code: "JPY", minorUnits: 0 }
}

export class Money {

  private constructor(
    private readonly amountMinor: bigint,
    private readonly currency: string
  ) {}

  static fromMinor(amountMinor: bigint, currency: string): Money {
    if (!currencyMap[currency]) {
      throw new Error("Unsupported currency")
    }

    if (amountMinor < 0n) {
      throw new Error("Amount cannot be negative")
    }

    return new Money(amountMinor, currency)
  }

  static fromMajor(amount: number, currency: string): Money {
    const meta = currencyMap[currency]
    if (!meta) {
      throw new Error("Unsupported currency")
    }

    const multiplier = 10 ** meta.minorUnits
    const minor = BigInt(Math.round(amount * multiplier))

    return new Money(minor, currency)
  }

  add(other: Money): Money {
    this.ensureSameCurrency(other)

    return new Money(
      this.amountMinor + other.amountMinor,
      this.currency
    )
  }

  subtract(other: Money): Money {
    this.ensureSameCurrency(other)

    return new Money(
      this.amountMinor - other.amountMinor,
      this.currency
    )
  }

  getMinor(): bigint {
    return this.amountMinor
  }

  getMajor(): number {
    const meta = currencyMap[this.currency]
    return Number(this.amountMinor) / (10 ** meta.minorUnits)
  }

  getCurrency(): string {
    return this.currency
  }

  private ensureSameCurrency(other: Money) {
    if (this.currency !== other.currency) {
      throw new Error("Currency mismatch")
    }
  }
}
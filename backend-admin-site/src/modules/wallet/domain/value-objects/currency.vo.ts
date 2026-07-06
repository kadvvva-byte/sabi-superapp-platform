export class Currency {
  private constructor(private readonly value: string) {}

  static create(currency: string): Currency {
    return new Currency(currency.toUpperCase())
  }

  getValue(): string {
    return this.value
  }
}
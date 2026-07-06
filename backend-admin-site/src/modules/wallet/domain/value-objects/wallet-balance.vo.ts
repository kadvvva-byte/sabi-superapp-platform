export class WalletBalance {
  constructor(private amount: number) {
    if (amount < 0) {
      throw new Error("Balance cannot be negative")
    }
  }

  add(value: number): WalletBalance {
    return new WalletBalance(this.amount + value)
  }

  subtract(value: number): WalletBalance {
    const result = this.amount - value

    if (result < 0) {
      throw new Error("Insufficient balance")
    }

    return new WalletBalance(result)
  }

  getValue(): number {
    return this.amount
  }
}
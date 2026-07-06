export class Money {

  private value: number

  constructor(value: number) {

    if (value < 0) {
      throw new Error("Money cannot be negative")
    }

    this.value = value
  }

  getAmount(): number {
    return this.value
  }

}
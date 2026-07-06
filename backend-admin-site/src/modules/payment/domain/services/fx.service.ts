import { Money } from "../value-objects/money"

interface FxRate {
  from: string
  to: string
  rate: number
}

export class FxService {

  private rates: FxRate[] = [
    { from: "USD", to: "UZS", rate: 12500 },
    { from: "UZS", to: "USD", rate: 0.00008 }
  ]

  convert(money: Money, targetCurrency: string): Money {

    if (money.getCurrency() === targetCurrency)
      return money

    const rate = this.findRate(
      money.getCurrency(),
      targetCurrency
    )

    const converted =
      Number(money.getMinor()) * rate

    return Money.fromMajor(
      converted,
      targetCurrency
    )
  }

  private findRate(from: string, to: string): number {
    const rate = this.rates.find(
      r => r.from === from && r.to === to
    )

    if (!rate)
      throw new Error("FX rate not found")

    return rate.rate
  }
}
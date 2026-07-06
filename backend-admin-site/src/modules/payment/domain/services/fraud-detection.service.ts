export interface FraudCheckContext {
  userId: string
  amount: number
  currency: string
  provider: string
  ip?: string
  country?: string
}

export class FraudDetectionService {

  async check(context: FraudCheckContext): Promise<void> {

    this.checkAmountLimit(context)
    this.checkCurrency(context)
    await this.checkVelocity(context)

  }

  private checkAmountLimit(context: FraudCheckContext) {
    const MAX_AMOUNT = 10000

    if (context.amount > MAX_AMOUNT) {
      throw new Error("Fraud detected: amount exceeds limit")
    }
  }

  private checkCurrency(context: FraudCheckContext) {
    const allowed = ["USD", "EUR", "UZS"]

    if (!allowed.includes(context.currency)) {
      throw new Error("Fraud detected: unsupported currency")
    }
  }

  private async checkVelocity(context: FraudCheckContext) {

    // TODO: подключить Redis или DB
    // Пример: если 5 платежей за 1 минуту — блокируем

    const suspicious = false

    if (suspicious) {
      throw new Error("Fraud detected: velocity anomaly")
    }
  }
}
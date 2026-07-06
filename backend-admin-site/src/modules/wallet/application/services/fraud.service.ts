export class FraudService {

  async checkTransaction(params: {
    walletId: string
    amount: number
  }) {

    const { amount } = params

    // простая проверка лимита
    if (amount > 10000) {
      return {
        allowed: false,
        reason: "Transaction blocked by fraud system"
      }
    }

    return {
      allowed: true
    }

  }

}
export class FraudService {

  async checkTransaction(payload: {
    fromWalletId: string
    toWalletId: string
    amount: number
  }) {

    if (payload.amount > 100000) {
      throw new Error("Transaction flagged: high risk amount")
    }

    return true
  }

}
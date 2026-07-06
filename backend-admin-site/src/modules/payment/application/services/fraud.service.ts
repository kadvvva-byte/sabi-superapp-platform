export class FraudService {

  checkAmount(amount: number) {

    const MAX_AMOUNT = 10000

    if (amount > MAX_AMOUNT) {
      throw new Error("Transaction blocked: amount exceeds limit")
    }

  }

  checkVelocity(userTransactions: number) {

    const MAX_TRANSACTIONS = 20

    if (userTransactions > MAX_TRANSACTIONS) {
      throw new Error("Transaction blocked: too many transactions")
    }

  }

}
export interface FraudCheckRequest {
  walletId: string
  amount: number
}

export interface FraudResult {
  allowed: boolean
  reason?: string
}

export class FraudDetectionService {

  private dailyLimit = 10000
  private maxSingleTransaction = 5000

  checkTransaction(request: FraudCheckRequest): FraudResult {

    const { walletId, amount } = request

    if (amount > this.maxSingleTransaction) {
      return {
        allowed: false,
        reason: "Transaction exceeds single limit"
      }
    }

    if (amount <= 0) {
      return {
        allowed: false,
        reason: "Invalid amount"
      }
    }

    return {
      allowed: true
    }

  }

}
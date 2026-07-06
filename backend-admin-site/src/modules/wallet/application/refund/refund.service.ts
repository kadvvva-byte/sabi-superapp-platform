import { PaymentOrchestrator } from "../payment/payment.orchestrator"

export interface RefundRequest {

  originalFromWalletId: string
  originalToWalletId: string
  amount: number
  reason?: string

}

export class RefundService {

  constructor(
    private payment: PaymentOrchestrator
  ) {}

  async refund(request: RefundRequest) {

    const { originalFromWalletId, originalToWalletId, amount, reason } = request

    if (amount <= 0) {
      throw new Error("Invalid refund amount")
    }

    // обратный перевод
    const transaction = await this.payment.transfer(
      originalToWalletId,
      originalFromWalletId,
      amount
    )

    return {
      status: "REFUNDED",
      reason,
      transaction
    }

  }

}
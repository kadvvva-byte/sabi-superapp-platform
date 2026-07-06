import { PaymentOrchestrator } from "../payment/payment.orchestrator"

export interface MerchantPaymentRequest {
  customerWalletId: string
  merchantWalletId: string
  amount: number
  orderId: string
}

export class MerchantService {

  constructor(
    private payment: PaymentOrchestrator
  ) {}

  async pay(request: MerchantPaymentRequest) {

    const { customerWalletId, merchantWalletId, amount, orderId } = request

    if (amount <= 0) {
      throw new Error("Invalid merchant payment amount")
    }

    const transaction = await this.payment.transfer(
      customerWalletId,
      merchantWalletId,
      amount
    )

    return {
      status: "SUCCESS",
      orderId,
      transaction
    }

  }

}
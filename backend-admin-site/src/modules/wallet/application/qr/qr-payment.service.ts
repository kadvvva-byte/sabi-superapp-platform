import { PaymentOrchestrator } from "../payment/payment.orchestrator"

export interface QRPayload {
  walletId: string
  amount: number
}

export class QRPaymentService {

  constructor(
    private payment: PaymentOrchestrator
  ) {}

  parseQR(qrString: string): QRPayload {

    try {

      const data = JSON.parse(qrString)

      if (!data.walletId) {
        throw new Error("Invalid QR")
      }

      return {
        walletId: data.walletId,
        amount: data.amount || 0
      }

    } catch {
      throw new Error("QR parsing failed")
    }

  }

  async payQR(
    fromWalletId: string,
    qrString: string
  ) {

    const qr = this.parseQR(qrString)

    const result = await this.payment.transfer(
      fromWalletId,
      qr.walletId,
      qr.amount
    )

    return result
  }

}
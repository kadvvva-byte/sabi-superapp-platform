import { QrPayment } from "../../domain/entities/qr-payment.entity"

export class CreateQrUseCase {

  execute(walletId: string, amount: number) {

    const qr = new QrPayment(
      "qr_" + Math.random().toString(36).substring(2, 10),
      walletId,
      amount,
      false
    )

    return qr
  }

}
export class QrGeneratorService {

  generate(payload: any): string {

    const data = {
      ...payload,
      createdAt: Date.now()
    }

    const qrCode = Buffer
      .from(JSON.stringify(data))
      .toString("base64")

    return qrCode
  }

  generatePaymentQR(data: {
    walletId: string
    amount: number
  }): string {

    const payload = {
      walletId: data.walletId,
      amount: data.amount,
      type: "PAYMENT"
    }

    return this.generate(payload)
  }

}
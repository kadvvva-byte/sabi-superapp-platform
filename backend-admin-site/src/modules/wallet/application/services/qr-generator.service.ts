import QRCode from "qrcode"

export class QrGeneratorService {

  async generate(walletId: string, amount?: number) {

    const payload = JSON.stringify({
      walletId,
      amount
    })

    const qr = await QRCode.toDataURL(payload)

    return {
      walletId,
      amount,
      qr
    }

  }

}
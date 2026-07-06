import { QrRepository } from "../infrastructure/qr.repository"

export class QrEngineService {

  constructor(private repo: QrRepository) {}

  async createQR(walletId: string, amount?: number) {

    return this.repo.create({
      walletId,
      amount
    })

  }

  async payQR(qrId: string) {

    const qr = await this.repo.findById(qrId)

    if (!qr) {
      throw new Error("QR not found")
    }

    await this.repo.markUsed(qrId)

    return qr
  }

}
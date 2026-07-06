import { QrRepository } from "../infrastructure/qr.repository"

export class QrService {

  constructor(private repo: QrRepository) {}

  async create(walletId: string, amount?: number) {

    return this.repo.create({
      walletId,
      amount
    })

  }

  async get(id: string) {
    return this.repo.findById(id)
  }

  async markUsed(id: string) {
    return this.repo.markUsed(id)
  }

}
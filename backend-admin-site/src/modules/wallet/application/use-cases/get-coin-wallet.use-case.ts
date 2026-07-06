import { NotFoundError } from "@/core/kernel"
import { CoinWalletRepository } from "../../domain/repositories/coin-wallet.repository"

export class GetCoinWalletUseCase {
  constructor(private readonly coinWallets: CoinWalletRepository) {}

  public async execute(coinWalletId: string) {
    const wallet = await this.coinWallets.findById(coinWalletId)

    if (!wallet) {
      throw new NotFoundError("Coin wallet not found.")
    }

    return wallet.toJSON()
  }

  public async executeByOwner(ownerUserId: string) {
    const wallet = await this.coinWallets.findByOwnerUserId(ownerUserId)

    if (!wallet) {
      throw new NotFoundError("Coin wallet not found.")
    }

    return wallet.toJSON()
  }
}
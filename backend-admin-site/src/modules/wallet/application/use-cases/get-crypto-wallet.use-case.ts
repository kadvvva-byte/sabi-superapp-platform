import { NotFoundError } from "@/core/kernel"
import { CryptoWalletRepository } from "../../domain/repositories/crypto-wallet.repository"

export class GetCryptoWalletUseCase {
  constructor(private readonly cryptoWallets: CryptoWalletRepository) {}

  public async execute(ownerUserId: string) {
    const wallet = await this.cryptoWallets.findByOwnerUserId(ownerUserId)

    if (!wallet) {
      throw new NotFoundError("Crypto wallet not found.")
    }

    return wallet.toJSON()
  }
}
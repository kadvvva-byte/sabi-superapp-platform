import { WalletRepository } from "../../domain/repositories/wallet.repository"
import { Money } from "../../domain/value-objects/money.vo"

export class WithdrawUseCase {

  constructor(
    private walletRepository: WalletRepository
  ) {}

  async execute(walletId: string, amount: number) {

    const wallet = await this.walletRepository.findById(walletId)

    if (!wallet) {
      throw new Error("Wallet not found")
    }

    const money = new Money(amount, wallet.currency)

    await this.walletRepository.save(wallet)

    return wallet

  }

}
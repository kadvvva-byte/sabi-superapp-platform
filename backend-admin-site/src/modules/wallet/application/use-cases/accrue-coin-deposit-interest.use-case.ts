import { NotFoundError } from "@/core/kernel"
import { CoinDepositRepository } from "../../domain/repositories/coin-deposit.repository"
import { CoinWalletRepository } from "../../domain/repositories/coin-wallet.repository"

type AccrueCoinDepositInterestInput = {
  depositId: string
  at?: Date
}

export class AccrueCoinDepositInterestUseCase {
  constructor(
    private readonly coinWallets: CoinWalletRepository,
    private readonly coinDeposits: CoinDepositRepository,
  ) {}

  public async execute(input: AccrueCoinDepositInterestInput) {
    const deposit = await this.coinDeposits.findById(input.depositId)

    if (!deposit) {
      throw new NotFoundError("Coin deposit not found.")
    }

    const wallet = await this.coinWallets.findById(deposit.coinWalletId)

    if (!wallet) {
      throw new NotFoundError("Coin wallet not found.")
    }

    const accrued = deposit.accrueUntil(input.at)

    if (accrued > 0) {
      wallet.creditEarnings(accrued)
      deposit.markInterestCredited(accrued)

      await this.coinWallets.save(wallet)
      await this.coinDeposits.save(deposit)
    }

    return {
      accrued,
      wallet: wallet.toJSON(),
      deposit: deposit.toJSON(),
    }
  }
}
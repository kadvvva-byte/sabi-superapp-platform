import { ConflictError, NotFoundError } from "@/core/kernel"
import { randomUUID } from "crypto"
import { CoinDepositEntity } from "../../domain/entities/coin-deposit.entity"
import { CoinDepositRepository } from "../../domain/repositories/coin-deposit.repository"
import { CoinWalletRepository } from "../../domain/repositories/coin-wallet.repository"

type OpenCoinDepositInput = {
  coinWalletId: string
  ownerUserId: string
  principalAmount: number
  termMonths: number
  openedAt?: Date
}

export class OpenCoinDepositUseCase {
  constructor(
    private readonly coinWallets: CoinWalletRepository,
    private readonly coinDeposits: CoinDepositRepository,
  ) {}

  public async execute(input: OpenCoinDepositInput) {
    const wallet = await this.coinWallets.findById(input.coinWalletId)

    if (!wallet) {
      throw new NotFoundError("Coin wallet not found.")
    }

    if (wallet.ownerUserId !== input.ownerUserId) {
      throw new ConflictError("Coin wallet owner mismatch.")
    }

    wallet.lock(input.principalAmount)

    const deposit = new CoinDepositEntity({
      id: randomUUID(),
      coinWalletId: input.coinWalletId,
      ownerUserId: input.ownerUserId,
      principalAmount: input.principalAmount,
      termMonths: input.termMonths,
      openedAt: input.openedAt,
    })

    await this.coinWallets.save(wallet)
    await this.coinDeposits.save(deposit)

    return {
      wallet: wallet.toJSON(),
      deposit: deposit.toJSON(),
    }
  }
}
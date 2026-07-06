import { ConflictError, NotFoundError } from "@/core/kernel"
import { randomUUID } from "crypto"
import { CoinCreditEntity } from "../../domain/entities/coin-credit.entity"
import { CoinCreditRepository } from "../../domain/repositories/coin-credit.repository"
import { CoinWalletRepository } from "../../domain/repositories/coin-wallet.repository"

type RequestCoinCreditInput = {
  coinWalletId: string
  ownerUserId: string
  principalAmount: number
  termMonths: number
}

export class RequestCoinCreditUseCase {
  constructor(
    private readonly coinWallets: CoinWalletRepository,
    private readonly coinCredits: CoinCreditRepository,
  ) {}

  public async execute(input: RequestCoinCreditInput) {
    const wallet = await this.coinWallets.findById(input.coinWalletId)

    if (!wallet) {
      throw new NotFoundError("Coin wallet not found.")
    }

    if (wallet.ownerUserId !== input.ownerUserId) {
      throw new ConflictError("Coin wallet owner mismatch.")
    }

    const credit = new CoinCreditEntity({
      id: randomUUID(),
      coinWalletId: input.coinWalletId,
      ownerUserId: input.ownerUserId,
      principalAmount: input.principalAmount,
      termMonths: input.termMonths,
    })

    await this.coinCredits.save(credit)

    return credit.toJSON()
  }
}